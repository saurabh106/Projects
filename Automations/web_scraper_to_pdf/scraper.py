import requests
from bs4 import BeautifulSoup

def scrape_quotes(base_url, max_pages=5):
    quotes = []
    for page in range(1, max_pages + 1):
        url = f"{base_url}?page={page}"
        print(f"Scraping page {page}...")
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        

        page_quotes = soup.find_all('div', class_='quote')
        for quote in page_quotes:
            quotes.append(quote.text.strip())
    return quotes
