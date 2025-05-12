import os

path = r'C:\Program Files\wkhtmltopdf\bin'

if os.path.exists(path):
    print("✅ File exists!")
else:
    print("❌ File NOT found.")
