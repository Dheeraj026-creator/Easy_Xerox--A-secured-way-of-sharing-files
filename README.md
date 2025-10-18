

---

## Project Overview
Easy Xerox eliminates the need for WhatsApp for both shop owners and customers, avoiding clutter, manual sharing, and privacy issues. It allows secure, real-time file sharing through unique links and QR codes.

---
**Live Demo:** [Click here to see the project](https://easy-xerox-a-secured-way-of-sharing-files.onrender.com)
## How It Works
- Admin generates a unique link (e.g., `/example`) with a password  
- Customers enter a code (e.g., `abc`) → redirected to `/example/abc` to upload files instantly  
- Admin can access all submitted codes using the associated password  

---

## Admin Control
- View, download, or delete files per user code  
- The password grants access to all active codes for centralized management  

---

## Technology Stack
- Node.js  
- Express.js  
- Socket.io  
- MongoDB Atlas  
- Multer  

---

## Features
- Real-time synchronization  
- QR-based uploads  
- Automatic file expiration (2 minutes)  

---

## Deployment & Storage
- Fully deployed on Render  
- Data securely stored on MongoDB Atlas  

---

## Benefits
- Saves time and improves efficiency  
- Ensures secure, organized, and modern file sharing  
- Simplifies file management for both customers and shop owners  

---

# How to Use

### Prerequisites
- Install and configure Git on your local machine  
- Have a terminal or code editor like VS Code ready  
- Install Node.js and npm  

### Clone the Repository
Run the following command in your terminal:  
git clone https://github.com/Dheeraj026-creator/Easy_Xerox--A-secured-way-of-sharing-files.git

markdown
Copy code

### Set Up MongoDB Atlas
- Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- Create a new cluster  
- Copy the connection string  

### Create a .env File
- In the project root, create a file named `.env`  
- Add your MongoDB connection string as:  
DB_URL=your_mongodb_connection_string

shell
Copy code

### Install Dependencies
npm install

shell
Copy code

### Run the Application
node app.js

markdown
Copy code

### Open in Browser
Open [http://localhost:5000](http://localhost:5000) in your browser to use the app  

---

# Using the App

### Home Page
- The app opens to a home page containing the QR generation page and Login/Signup page  
- **Login is required** to access the QR generation page  

### QR Generation
- After login, users can generate a QR code  
- The page provides:  
  - The generated link for the user (http://localhost:5000/generatedlink)  
  - An associated password  
  - A downloadable QR image  
  - An option to regenerate the link if needed  
- This link acts as the home page for the customer  
- Scanning the QR code also leads to this page  

### Customer File Upload
- On the generated link page, customers can enter a desired code (e.g., `abc` or `dhee`)  
- They are redirected to:  
  http://localhost:5000/generatedlink/abc
  in this url user can upload their file 


- Users can upload files (images, PDFs, PPTs, etc.)  

### Admin Access
- If the entered code matches the associated password, it redirects to the admin page:  
https://xeroxshop-1.onrender.com/example/<assopassword>
here the codes enteres by the users are listed in the form of buttons by clicking that the admin can download and print files 

yaml
Copy code
- The admin can see all codes as clickable buttons, leading to the respective user-uploaded files  
- Admins can download or print files  
- Files are automatically deleted after 2 minutes  

---
