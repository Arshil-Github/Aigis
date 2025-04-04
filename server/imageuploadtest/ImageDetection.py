import cv2
import torch
import os
import json
from datetime import datetime

# Load YOLO model (assuming YOLOv5 is used)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

# Directory containing images (frames from a 1fps video)
IMAGE_DIR = "images"
OUTPUT_FILE = "object_data.json"
LOCATION =  {
    "latitude": 28.7041,
    "longitude": 77.1025
}

# Load or initialize data
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r") as f:
        data = json.load(f)
else:
    data = {"loc": LOCATION, "captures": []}

def analyze_images():
    for image_name in sorted(os.listdir(IMAGE_DIR)):
        if image_name.endswith(('.jpg', '.png', '.jpeg')):
            image_path = os.path.join(IMAGE_DIR, image_name)
            image = cv2.imread(image_path)
            results = model(image)
            object_count = len(results.pred[0])  # Number of objects detected

            import cv2
import torch
import os
import json
from datetime import datetime

# Load YOLO model (assuming YOLOv5 is used)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

# Directory containing images (frames from a 1fps video)
IMAGE_DIR = "images"
OUTPUT_FILE = "object_data.json"
LOCATION = "Predefined_Location"

# Load or initialize data
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "r") as f:
        data = json.load(f)
else:
    data = {"loc": LOCATION, "captures": []}

def analyze_images():
    for image_name in sorted(os.listdir(IMAGE_DIR)):
        if image_name.endswith(('.jpg', '.png', '.jpeg')):
            image_path = os.path.join(IMAGE_DIR, image_name)
            image = cv2.imread(image_path)

            if image is None:
                print(image_path)
                print(f"Warning: Unable to read {image_path}. Skipping...")
                continue
            results = model(image)
            object_count = len(results.pred[0])  # Number of objects detected


            # Extract timestamp from filename (Assuming format: image_YYYY-MM-DDTHH-MM-SS-SSSZ.jpg)
            try:
                timestamp_str = image_name.split('_')[1].split('.')[0]
                timestamp = datetime.strptime(timestamp_str, "%Y-%m-%dT%H-%M-%S-%fZ").isoformat()
            except Exception:
                timestamp = datetime.now().isoformat()

            data["captures"].append({
                "time": timestamp,
                "objectNumber": object_count
            })

    # Save data to JSON
    with open(OUTPUT_FILE, "w") as f:
        json.dump(data, f, indent=4)


def is_street_isolated(threshold=2, time_window=5):
    """
    Determines if the street is isolated.
    - threshold: Minimum number of objects to consider it not isolated.
    - time_window: Number of last captures to check.
    """
    captureArray = data["captures"]
    if len(captureArray) < time_window:
        return False  # Not enough data to determine
    
    recent_captures = captureArray[-time_window:]

    avg_objects = sum(capture["objectNumber"] for capture in recent_captures) / time_window
    
    return avg_objects < threshold

def remove_imageFolder():
    for image_name in sorted(os.listdir(IMAGE_DIR)):
        if image_name.endswith(('.jpg', '.png', '.jpeg')):
            image_path = os.path.join(IMAGE_DIR, image_name)
            os.remove(image_path)
    print("All images removed")


if __name__ == "__main__":
    analyze_images()
    isolated = is_street_isolated(2, 6)
    remove_imageFolder()
    print(isolated)
    print("Street is isolated:" if isolated else "Street is not isolated.")
