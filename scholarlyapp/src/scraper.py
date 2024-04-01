import requests
from bs4 import BeautifulSoup
import pandas as pd


# The base URL of the academic works
BASE_URL = "https://csus.academicworks.com"

def get_text_safe(element):
    return element.text.strip() if element else 'Not Available'

def scrape_main_page(url):
    # Send HTTP request to the URL
    response = requests.get(url)
    response.raise_for_status()  # Will raise an exception for HTTP errors
    soup = BeautifulSoup(response.text, 'html.parser')

    # Check for the "Ended" status in the table rows
    for tr in soup.select('table.striped-table tbody tr'):
        if 'Ended' in tr.text:
            # Stop scraping if "Ended" is found
            break
        else:
            # Find the scholarship link
            link = tr.select_one('a[href*="/opportunities/"]')
            if link and 'Deadline' not in link.text:
                yield BASE_URL + link['href']

def scrape_scholarship_page(url):
    # Send HTTP request to the scholarship detail page
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    # Initialize details dictionary
    details = {
        'title': 'Not Available',
        'description': 'Not Available',
        'eligibility': 'Not Available',
        'award': 'Not Available',
        'scopes': 'Not Available',
        'deadline': 'Not Available',
        'supplemental_questions': []
    }

    # Extract the title
    title = soup.find('h3', role='header')
    if title:
        details['title'] = title.text.strip()

    # Extract the description
    description = soup.select_one('header.section-header.main p')
    if description:
        details['description'] = ' '.join(description.text.strip().split())

    # Extract eligibility criteria from the list
    eligibility_list = soup.select('header.section-header.main ul li')
    if eligibility_list:
        details['eligibility'] = ' '.join([li.text.strip() for li in eligibility_list])

    # Extract award, scopes, deadline
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

    # Extract supplemental questions
    questions = soup.select('dl dt:contains("Supplemental Questions") + dd ol li')
    for question in questions:
        details['supplemental_questions'].append(question.text.strip())

    return details



def save_details(details):
    # Save the scraped details to a text file (append mode)
    with open('scholarships.txt', 'a', encoding='utf-8') as file:
        file.write(f"Title: {details['title']}\n")
        file.write(f"Description: {details['description']}\n")
        file.write(f"Eligibility: {details['eligibility']}\n")  # Assuming you want to include eligibility criteria
        file.write(f"Award: {details['award']}\n")
        file.write(f"Scopes: {details['scopes']}\n")
        file.write(f"Deadline: {details['deadline']}\n")
        file.write("Supplemental Questions:\n")
        for question in details['supplemental_questions']:  # Use 'supplemental_questions' to match the key
            file.write(f"- {question}\n")
        file.write("\n---------------------------------\n")


def start_scraping(start_url):
    print("Starting the scraping process...")
    scholarship_links = list(scrape_main_page(start_url))
    print(f"Found {len(scholarship_links)} scholarships to scrape.")
    
    # Initialize an empty list to collect scholarship details
    scholarships_data = []

    for link in scholarship_links:
        print(f"Scraping details from: {link}")
        details = scrape_scholarship_page(link)
        
        # Add URL to the details for reference
        details['url'] = link
        
        # Append the scholarship details to the list
        scholarships_data.append(details)
        print(f"Scraped details from: {link}")
    
    # Convert the list of dictionaries into a pandas DataFrame
    df = pd.DataFrame(scholarships_data)
    
    # Save the DataFrame to a CSV file
    df.to_csv('scholarships_data.csv', index=False)
    print("Scraping and saving completed. Data saved to scholarships_data.csv")
    
# Pass the URL of the page to start scraping
start_url = "https://csus.academicworks.com/?page=1"
start_scraping(start_url)
