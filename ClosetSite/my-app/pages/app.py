from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
from rembg import remove
import io

app = Flask(__name__)
CORS(app)  # Enable CORS


@app.route("/remove-background", methods=["POST"])
def remove_background():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    if file.filename == "":
        return "No selected file", 400
    if file and file.filename.endswith((".png", ".jpg", ".jpeg")):
        input_image = Image.open(file.stream).convert("RGBA")
        output_image = Image.open(io.BytesIO(remove(input_image.tobytes())))
        img_byte_arr = io.BytesIO()
        output_image.save(img_byte_arr, format="PNG")
        img_byte_arr = img_byte_arr.getvalue()
        return send_file(io.BytesIO(img_byte_arr), mimetype="image/png")


if __name__ == "__main__":
    app.run(debug=True)
