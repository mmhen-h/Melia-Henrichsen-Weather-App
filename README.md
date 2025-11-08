# Weather Comparison Dashboard  
**Author:** Melia Henrichsen  

## Description  
A full-stack web application that compares real-time weather data between multiple cities using React (frontend) and Node.js with Express (backend). Users can input up to 10 cities, fetch current weather conditions in both Celsius and Fahrenheit, and view the results in a responsive grid layout. Weather data is sourced from the OpenWeatherMap API.

## Features  
- Fetches and compares temperature data from OpenWeatherMap API  
- Users choose how many cities to compare (up to 10)  
- Dynamic input generation based on city count  
- Displays temperatures in both °C and °F  
- City names automatically formatted in Title Case  
- Responsive two-column layout: inputs on the left, results on the right  
- Cloud-themed background image  
- Semi-transparent overlay box for the title  
- Drop shadows and hover animations on inputs, buttons, and results panel  
- Graceful error handling for invalid or unrecognized city names  
- Displays weather condition icons and descriptions using OpenWeatherMap's icon API  
- Built with React and Axios
- Background color changes based on weather type

## Technologies  
- React(Functional components + Hooks)
- Axios for API requests
- Node.js  
- Express  
- JavaScript (ES6+)  
- OpenWeatherMap API for weather data
- CSS Flexbox  
- Inline CSS styling with responsive layout

## Run Instructions  
1. Clone the repository  
2. Run `npm install` in both `frontend/` and `backend/`  
3. Start backend: `node server.js`  
4. Start frontend: `npm start`  
5. Open [http://localhost:3000](http://localhost:3000) in your browser  

## Optional Enhancements  
- Save favorite cities or recent searches  
- Add animations or transitions for result cards  
- Deploy to a cloud platform like Vercel or Heroku
- Add country selection or auto-suggest
- Improve mobile responsiveness
- Cache recent searches
- Switch to CSS modules or styled-components