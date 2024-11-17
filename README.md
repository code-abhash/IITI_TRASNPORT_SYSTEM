# IIT Indore Transport Management System


## Project Overview

This project is a full-stack application developed as a minor project fot the CSE course: _Database and Information Systems_ at IIT Indore. The system simplifies vehicle bookings and provides real-time updates for students and faculty, ensuring an efficient transport management experience.
- **Frontend**: Built with React, Vite, and Tailwind CSS.
- **Backend**: Developed using Django and Django REST Framework.

## Features
### 🚌 User Features: 

- **User Registration and Login**: Secure access for students, faculty, and administrators.
- **Vehicle Booking**: Simple interface for booking buses or cabs.
- **Schedule Management**: View detailed schedules for buses and Electric Vehicles.
- **Annoucement**: Stay updated with the latest notifications and announcements posted by the admin, such as changes in schedules, new routes, or system updates.

### 🔧 Admin Features
- **Booking Requests** : Admins can view booking requests submitted by users and assign vehicles and drivers accordingly, ensuring efficient transport management.
- **Manage Vehicles and Drivers**: Admins can add new vehicles and drivers to the system, update existing records, and ensure proper resource allocation for smooth operations.

## Tech stacks:

### Backend:
- Django
- Django Rest Framework

### Frontend
- React.js
- Vite
- Taliwand Css


## Installation

- Please run these 2 servers in split terminals
- Make sure you have installed node.js,npm,python,pip in your Machine
- We have requirements.txt file which downloads the entire dependencies required for django

### Frontend
1. Clone the repository:
   ```bash
   git clone -b branch_final https://github.com/code-abhash/IITI_TRASNPORT_SYSTEM.git
   cd frontend
   ```
2.	Install dependencies and run the server:   
    ```bash
    npm install
    npm run dev
    ```

### Backend

1. Set up your own virtual environment in backend folder:
   ```bash
   python -m venv env
   On Mac: source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Download the necessary package using requirement.txt in the virtual enviroment
   ```bash
   pip install -r requirements.txt
   ```
3. Activate virtual enviroment and apply migrations and start the server
   ```bash      
   cd backend
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver

