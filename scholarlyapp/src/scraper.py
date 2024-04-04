import asyncio
import aiohttp
from bs4 import BeautifulSoup
import os

# Determine the directory of the current script and set the output file path accordingly
script_dir = os.path.dirname(os.path.abspath(__file__))
output_file_path = os.path.join(script_dir, "scholarships_data.txt") #.csv, .txt, etc..

# The base URL of the academic works
BASE_URL = "https://csus.academicworks.com"

async def fetch(url, session):
    """Asynchronously fetch a URL using aiohttp and return the text content."""
    async with session.get(url) as response:
        return await response.text()

async def scrape_main_page(url, session):
    """Scrape the main page for scholarship links."""
    text = await fetch(url, session)
    soup = BeautifulSoup(text, 'html.parser')
    for tr in soup.select('table.striped-table tbody tr'):
        if 'Ended' in tr.text:
            break
        else:
            link = tr.select_one('a[href*="/opportunities/"]')
            if link and 'Deadline' not in link.text:
                yield BASE_URL + link['href']

async def scrape_scholarship_page(url, session):
    """Scrape details from a single scholarship page."""
    text = await fetch(url, session)
    soup = BeautifulSoup(text, 'html.parser')
    details = {
        'title': 'Not Available',
        'description': 'Not Available',
        'eligibility': 'Not Available',
        'award': 'Not Available',
        'scopes': 'Not Available',
        'deadline': 'Not Available',
        'supplemental_questions': [],
        'url': url
    }
    title = soup.find('h3', role='header')
    if title:
        details['title'] = title.text.strip()
    description = soup.select_one('header.section-header.main p')
    if description:
        details['description'] = ' '.join(description.text.strip().split())
    eligibility_list = soup.select('header.section-header.main ul li')
    if eligibility_list:
        details['eligibility'] = ' '.join([li.text.strip() for li in eligibility_list])
    dls = soup.select('dl')
    for dl in dls:
        dt_text = dl.find('dt').text.strip()
        dd_text = dl.find('dd').text.strip()
        if 'Award' in dt_text:
            details['award'] = dd_text
        elif 'Scopes' in dt_text:
            details['scopes'] = dd_text
        elif 'Deadline' in dt_text:
            details['deadline'] = dd_text
    questions = soup.select('dl dt:-soup-contains("Supplemental Questions") + dd ol li')
    for question in questions:
        details['supplemental_questions'].append(question.text.strip())
    return details

async def start_scraping(start_url):
    """Start the scraping process."""
    scholarships_text_data = ""  # Initialize an empty string to accumulate scholarship details
    async with aiohttp.ClientSession() as session:
        main_page_links = [link async for link in scrape_main_page(start_url, session)]
        tasks = [scrape_scholarship_page(link, session) for link in main_page_links]
        scholarships_data = await asyncio.gather(*tasks)
        
        # Process each scholarship's details into a text format and append to the scholarships_text_data string
        for scholarship in scholarships_data:
            scholarship_details = "\n".join([f"{key}: {value}" for key, value in scholarship.items()]) + "\n\n---\n\n"
            scholarships_text_data += scholarship_details

        # Save the data to a text file
        with open(output_file_path, 'w', encoding='utf-8') as file:
            file.write(scholarships_text_data)
        print(f"Data saved to {output_file_path}")

    return scholarships_text_data  # Return the accumulated text data

# Run the scraping process and use the scholarships_text variable
if __name__ == "__main__":
    scholarships_text = asyncio.run(start_scraping("https://csus.academicworks.com/?page=1"))
    # Example usage of the scholarships_text variable
    print(scholarships_text)
