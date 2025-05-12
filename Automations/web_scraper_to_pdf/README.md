# 🕸️ Web Scraper to PDF Generator (Tkinter GUI)

This project is a Python-based web scraping tool with a user-friendly GUI that extracts quotes from multiple websites and converts them into a stylish PDF report. It’s built using `requests`, `BeautifulSoup`, `pdfkit`, and `tkinter`.

---

## ✨ Features

- ✅ **Multi-website support**: Scrape quotes from predefined or custom URLs
- 🖼️ **Graphical User Interface**: Built with Tkinter for ease of use
- 📄 **PDF Export**: Beautifully styled output using `pdfkit` and `wkhtmltopdf`
- 📁 **Custom Save Location**: Choose where to save the output PDF
- 🕘 **Timestamped Output (optional)**: Save files with the current date
- ⚙️ **Extensible Codebase**: Add more websites and features easily

---

## 🔧 Technologies Used

- `Python 3`
- `BeautifulSoup4` for scraping
- `pdfkit` + `wkhtmltopdf` for PDF generation
- `Jinja2` for HTML templating
- `Tkinter` for GUI

---

## 🖥️ GUI Preview

The app allows you to:
- Select from built-in websites like *Quotes*, *Books*, or *Stocks*
- Enter a custom URL if preferred
- Choose where to save the output file
- Generate a clean, readable PDF with the scraped content

---

## 🚀 How to Run

1. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

2. Make sure `wkhtmltopdf` is installed and added to system PATH.

3. Run the GUI:
    ```bash
    python gui.py
    ```

---

## 🛠 Next Steps (Optional Features to Add)

- 🔁 Pagination scraping across multiple pages
- 🧠 Intelligent content parsing per website
- ⏰ Auto-schedule scraping with `schedule` or Task Scheduler
- 🧩 Add filters for tags/authors
- 💾 Export scraped data to CSV as well

---