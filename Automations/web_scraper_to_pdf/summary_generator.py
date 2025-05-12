from jinja2 import Template

def generate_html_report(quotes):
    html_template = """
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 40px;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                text-align: center;
                color: #2c3e50;
                border-bottom: 2px solid #2980b9;
                padding-bottom: 10px;
                margin-bottom: 40px;
            }
            .quote {
                background-color: #ffffff;
                padding: 20px;
                margin-bottom: 20px;
                border-left: 5px solid #3498db;
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
            }
            .quote p {
                font-size: 18px;
                line-height: 1.6;
            }
            .author {
                margin-top: 10px;
                font-weight: bold;
                color: #555;
                font-size: 16px;
            }
            .tags {
                margin-top: 5px;
                color: #999;
                font-size: 14px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <h1>Quotes Report</h1>
        {% for item in quotes %}
        <div class="quote">
            <p>"{{ item.quote }}"</p>
            <p class="author">— {{ item.author }}</p>
            {% if item.tags %}
            <p class="tags">Tags: {{ item.tags | join(', ') }}</p>
            {% endif %}
        </div>
        {% endfor %}
    </body>
    </html>
    """
    template = Template(html_template)
    return template.render(quotes=quotes)
