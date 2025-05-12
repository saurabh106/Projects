from scraper import scrape_quotes
from pdf_creator import save_pdf_from_html

def main():
    
    base_url = "https://quotes.toscrape.com/"
    

    print("[...] Scraping quotes from website...")
    quotes = scrape_quotes(base_url)
    
    print("[✔] Quotes scraped successfully.")
    
    html_report = "<html><body><h1>Quotes</h1><ul>"
    for quote in quotes:
        html_report += f"<li>{quote}</li>"
    html_report += "</ul></body></html>"

    print("[...] Generating HTML summary...")

    save_pdf_from_html(html_report)
    print("[✔] PDF saved successfully.")

if __name__ == "__main__":
    main()
