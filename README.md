# NASA Data Explorer

This project is a web application that allows users to explore data from NASA APIs, specifically the Astronomy Picture of the Day (APOD) and Mars Rover Photos. It consists of a backend API built with Node.js (Express) and a frontend web application built with React.

## Technologies Used

### Backend
*   Node.js
*   Express.js
*   Axios (for making HTTP requests to NASA APIs)
*   CORS (for handling Cross-Origin Resource Sharing)
*   Dotenv (for environment variables)
*   Express-validator (for request validation)
*   Nodemon (for development server auto-restarts)

### Frontend
*   React
*   Material-UI (MUI) for UI components
*   Axios (for making HTTP requests to the backend)
*   Day.js (for date manipulation)
*   Swiper (for image carousels)

## Project Structure

The project is divided into two main parts:

*   `backend/`: Contains the Node.js Express API.
*   `frontend/web/`: Contains the React web application.

## Setup Instructions

To set up and run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/eskandg/nasa-data-explorer.git
cd nasa-data-explorer
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your NASA API key:

```
NASA_API_KEY=YOUR_NASA_API_KEY
```

You can obtain a NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/).

### 3. Frontend Setup

Navigate to the `frontend/web` directory and install dependencies:

```bash
cd ../frontend/web
npm install
```

## Running the Application

### 1. Start the Backend Server

From the `backend` directory, run:

```bash
npm start
```
The backend server will run on `http://localhost:8000`.

### 2. Start the Frontend Application

From the `frontend/web` directory, run:

```bash
npm start
```
The frontend application will open in your browser at `http://localhost:3000`.

## API Endpoints

The backend provides the following API endpoints:

*   `/apod`: Astronomy Picture of the Day
*   `/mars-rover`: Mars Rover Photos

The frontend interacts with these endpoints to fetch and display data.

