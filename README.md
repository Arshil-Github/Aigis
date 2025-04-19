**Tech Stack:**

- **Mobile Frontend (Main App & Volunteer App):** React Native, Tailwind CSS
- **Camera Owner App:** React Native
- **Backend:** Node.js, Express.js (*Implemented*), MongoDB (*Database*). Python server (*for ML/CV processing*).
- **Machine Learning / Computer Vision:** TensorFlow, YOLO (for human activity detection), OpenCV (for CV tasks).
- **IoT / Hardware:** Raspberry Pi (for camera module), Camera Module, Gyroscope & Accelerometer (on phone, for SOS fall detection). (*Wearables integration & Smart HDMI adapters were proposed features*).
- **APIs / External Data:** Google Maps API (for routing), Government FIR Data Source (for danger rating).

**Project Overview:**

- **Idea & USP:** Developed as a solo project over 10 days for a national hackathon (hosted by CMR College, Hyderabad, Feb 2024 - where it was selected among the top 121 teams out of 1531), Aigis is a comprehensive ecosystem designed to enhance women's safety. Its unique selling proposition is the multi-layered approach combining real-time environmental monitoring (smart cameras detecting isolation/activity), data-driven insights (safe routing, location danger ratings based on FIR data), rapid emergency response (smart SOS, volunteer network), and community engagement.
- **Summary:** Aigis integrates several components: a network of smart cameras (Raspberry Pi-based) detect isolated streets or unusual activity, feeding data via a Python server to the main Express backend. The primary React Native app provides users with safe route mapping (using Google Maps, camera data, FIR data, and crowdsourced tips), location-specific danger ratings (derived from analyzing regional FIR data), localized crime reporting, and a mini-social feed for sharing safety experiences. A smart SOS feature triggers alerts based on phone sensor data (falls via accelerometer/gyroscope) or potentially wearable inputs, notifying nearby volunteers (via a separate volunteer app) and local authorities. Camera owners are incentivized and interact via their own app.
- **Result/Status:** A functional prototype demonstrating the core concepts was developed and presented at the hackathon. Key implemented features included the React Native app, Express/MongoDB backend, Raspberry Pi camera setup for basic isolation detection, the danger rating system based on FIR data analysis, the SOS trigger logic, and the framework for safe routing and community features.

**Key Features:**

- **Smart Camera Network:** Utilizes Raspberry Pi cameras to detect if streets are isolated or have unusual activity, assigning safety ratings to camera locations. Includes a dedicated app for camera owners for transparency and potential gamified rewards/incentives.
- **Safe Route Mapping:** Calculates the safest route between two points by integrating Google Maps data with real-time camera safety ratings, historical crime data (derived from FIRs), and crowdsourced safety tips.
- **Location Danger Rating:** Analyzes scraped government FIR data to determine the most probable types of crime in a given region and assigns a dynamic danger rating to locations.
- **Smart SOS System:** Triggers SOS alerts automatically if the app detects a fall (using phone's accelerometer/gyroscope). Alerts are sent to registered nearby volunteers and local authorities. (*Wearable integration for distress detection was a proposed extension*).
- **Volunteer Network & App:** A dedicated app allows volunteers to register, receive SOS alerts based on proximity, and contribute localized safety tips.
- **Community & Reporting Platform:**
    - Localized crime reporting feature within the main app.
    - Mini social media feed for users to share safety experiences/advice about specific places.
    - NGO Feed to raise awareness about relevant organizations.

**Challenges and Solutions:**

- **Challenge 1 (Data Integration Complexity):** Combining and analyzing diverse real-time and historical data sources (live camera input, government FIR data, Google Maps, user reports) for accurate safe routing and danger assessment.
    - **Solution:** Developed specific backend logic (Express.js) and potentially Python scripts to fetch, parse, process, and weigh inputs from different sources. Focused on core data points for the hackathon prototype.
- **Challenge 2 (Real-time Computer Vision):** Processing camera feeds in real-time for activity/isolation detection, potentially on resource-constrained hardware like Raspberry Pi.
    - **Solution:** Utilized established CV libraries (OpenCV, with YOLO proposed for specific detection) likely running on a dedicated Python server communicating with the main backend, potentially offloading heavy processing from the Pi itself if needed.
- **Challenge 3 (System Scope & Solo Development):** Implementing a multi-faceted system (multiple apps, hardware integration, ML, complex backend logic) as a single developer within a strict 10-day hackathon timeline.
    - **Solution:** Prioritized core functionality for the hackathon demo. Employed rapid development frameworks (React Native, Express.js). Focused on demonstrating the key concepts of each component, even if full integration or polish was limited.
- **Challenge 4 (Reliable Data Acquisition):** Programmatically accessing and interpreting potentially unstructured or inconsistent government FIR data for the danger rating system.
    - **Solution:** Implemented scraping or utilized available APIs (if any) for the FIR data source. Developed parsing logic to extract relevant information (location, crime type), acknowledging potential limitations in data consistency or availability.

**Timeline:**

- Developed solo over an intensive 10-day period.
- Created for and presented at a national-level hackathon hosted by CMR College, Hyderabad (Feb 2024).

**What I Learned:**

- **Full-Stack Development:** End-to-end implementation connecting React Native frontend, Express.js backend, MongoDB database, and external APIs/services.
- **ML/CV Integration:** Incorporating computer vision (object/activity detection) into a larger application using Python, potentially TensorFlow/YOLO, and handling communication between ML services and the main backend.
- **IoT & Hardware Integration:** Setting up and programming Raspberry Pi for camera input and integrating sensor data (accelerometer/gyroscope) for application logic (SOS trigger).
- **API Integration & Data Scraping:** Working with external APIs (Google Maps) and potentially scraping/parsing data from public sources (government FIR websites).
- **System Architecture Design:** Designing a complex, multi-component system involving multiple user types (end-users, volunteers, camera owners) and data flows.
- **Data Fusion:** Developing logic to combine information from various sources (maps, sensors, user input, external data) to generate actionable insights (safe routes, danger levels).
- **Rapid Prototyping & Hackathon Development:** Efficiently building and demonstrating a functional prototype under extreme time constraints as a solo developer.
- **Mobile Sensor Usage:** Utilizing built-in phone sensors (accelerometer, gyroscope) for event detection (falls).
