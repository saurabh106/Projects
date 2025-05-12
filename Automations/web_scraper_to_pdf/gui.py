import tkinter as tk
from tkinter import filedialog, messagebox
from tkinter import ttk
from scraper import scrape_quotes
from pdf_creator import save_pdf_from_html
import os

# Global variable to store save path
save_path = None

def on_scrape():
    global save_path
    selected_website = website_dropdown.get()

    # Determine which URL to use
    if selected_website == "Quotes Website":
        url = "https://quotes.toscrape.com/"
    elif selected_website == "Stock Website":
        url = "https://stocktrade.onrender.com/"
    elif selected_website == "Tech Quotes Website":
        url = "https://techquotes.com/"
    elif selected_website == "Motivational Quotes":
        url = "https://motivational-quotes.com/"
    elif selected_website == "News Website":
        url = "https://newswebsite.com/"
    elif selected_website == "Books Website":
        url = "https://books.toscrape.com/"
    elif selected_website == "Other":
        url = url_entry.get().strip()
    else:
        url = ""

    if not url:
        messagebox.showerror("Input Error", "Please enter or select a URL!")
        return

    try:
        quotes = scrape_quotes(url)
        if not quotes:
            messagebox.showerror("Error", "No quotes found!")
            return

        html_report = "<html><body><h1>Quotes</h1><ul>"
        for quote in quotes:
            html_report += f"<li>{quote}</li>"
        html_report += "</ul></body></html>"

        if save_path:
            save_pdf_from_html(html_report, save_path)
            result_label.config(text=f"✅ PDF saved to: {os.path.basename(save_path)}", fg="green")
        else:
            messagebox.showerror("Error", "Please choose a save location!")

    except Exception as e:
        messagebox.showerror("Error", f"An error occurred:\n{str(e)}")

def on_browse():
    global save_path
    save_path = filedialog.asksaveasfilename(
        defaultextension=".pdf",
        filetypes=[("PDF files", "*.pdf")],
        initialfile="quotes_output.pdf"
    )
    if save_path:
        browse_button.config(text=f"📁 Save to: {os.path.basename(save_path)}")
    else:
        browse_button.config(text="Choose Save Location")

# GUI Setup
window = tk.Tk()
window.title("🌐 Web Scraper & PDF Generator")
window.geometry("560x420")
window.resizable(False, False)
window.configure(bg="#f8f9fa")

# Styles
style = ttk.Style()
style.theme_use("clam")
style.configure("TButton", font=("Segoe UI", 11), padding=6)
style.configure("TLabel", font=("Segoe UI", 11), background="#f8f9fa")
style.configure("TCombobox", font=("Segoe UI", 11), padding=5)

# Title
title_label = tk.Label(window, text="Web Scraper & PDF Generator", font=("Segoe UI", 16, "bold"), bg="#f8f9fa", fg="#2c3e50")
title_label.pack(pady=(20, 10))

# Website dropdown
dropdown_label = ttk.Label(window, text="Choose a website to scrape:")
dropdown_label.pack(pady=(10, 5))

website_dropdown = ttk.Combobox(window, values=[
    "Quotes Website",
    "Stock Website",
    "Tech Quotes Website",
    "Motivational Quotes",
    "News Website",
    "Books Website",
    "Other"
], width=52, state="readonly")
website_dropdown.set("Quotes Website")
website_dropdown.pack()

# URL entry
url_label = ttk.Label(window, text="Or enter a custom URL:")
url_label.pack(pady=(15, 5))

url_entry = ttk.Entry(window, width=55)
url_entry.pack()

# Save path
browse_button = ttk.Button(window, text="Choose Save Location", command=on_browse)
browse_button.pack(pady=15)

# Scrape button
scrape_button = ttk.Button(window, text="Scrape and Generate PDF", command=on_scrape)
scrape_button.pack(pady=10)

# Result display
result_label = tk.Label(window, text="", bg="#f8f9fa", font=("Segoe UI", 10, "italic"))
result_label.pack(pady=10)

# Start the GUI
window.mainloop()
