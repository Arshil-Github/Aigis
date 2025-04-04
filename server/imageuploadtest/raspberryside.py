import time
import requests
import libcamera
import os

# Server URL
SERVER_URL = "http://192.168.127.212:3000/upload"

# Hardcoded geolocation
gps_data = {
    "latitude": 28.7041,
    "longitude": 77.1025
}

# Image capture function
def capture_image(image_path):
    os.system(f"libcamera-still -o {image_path} --nopreview")

def send_data():
    image_path = "image.jpg"
    capture_image(image_path)
    
    with open(image_path, "rb") as image_file:
        files = {"image": image_file}
        data = gps_data
        try:
            response = requests.post(SERVER_URL, files=files, data=data)
            print("Response:", response.text)
        except Exception as e:
            print("Error:", e)

if __name__ == "__main__":
    while True:
        send_data()
        time.sleep(5)
