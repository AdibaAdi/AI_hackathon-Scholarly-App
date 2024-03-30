import requests
from bs4 import BeautifulSoup

def scrape_website(url):

    #Scrapes the specified URL for scholarship information and prints the results.
    
    try:
        # Send a GET request to the website
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError if the response status code is 4XX or 5XX

        # Parse the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Placeholder for extracting specific information
        # adjust the selection method based on the structure of the webpage and data needs
        scholarships = soup.find_all('div', class_='scholarship')  # Example

        # Process and print the extracted information
        for scholarship in scholarships:
            print(scholarship.text)  # Example
    except Exception as e:
        print(f"An error occurred while scraping the website: {e}")

# The URL of the page you want to scrape
url = 'https://csus.academicworks.com/'

if __name__ == "__main__":
    scrape_website(url)
