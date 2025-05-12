import pdfkit

def save_pdf_from_html(html_content, output_path):
    try:
        
        config = pdfkit.configuration(wkhtmltopdf=r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe')

        
        pdfkit.from_string(html_content, output_path, configuration=config)
        print("[✔] PDF Generated Successfully!")
    except Exception as e:
        print(f"[✖] Error: {e}")
