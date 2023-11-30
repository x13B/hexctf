from fastapi import FastAPI
from fastapi.responses import HTMLResponse

flag_location = 1337
flag = ""

app = FastAPI()


@app.get("/")
async def root():
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>HexCTF</title>
    </head>
    <body>
    """

    items = [f'<p><a href="/files/{i}">page {i}</a></p>\n' for i in range(5000)]

    html_content += "".join(items)

    html_content += """
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)


@app.get("/files/{location_id}")
async def flag(location_id: str):
    if int(location_id) == flag_location:
        html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Found Me</title>
        </head>
        <body>
            <p>You found me.</p>
            <p>Flag: {hexctf-you-found-me}</p>
        </body>
        </html>
        """
    else:
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Not Here</title>
        </head>
        <body>
            <p>The flag is in another location.</p>
        </body>
        </html>
        """
    return HTMLResponse(content=html_content, status_code=200)
