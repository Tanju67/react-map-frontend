# R-Map

[View Demo here:https://r-map.onrender.com](https://r-map.onrender.com)

An map application built with React JS and Leaflet for the frontend and Express JS and Mongoose for the backend by using [Restcountries REST API](https://restcountries.com/) and [Geoapify REST API](https://www.geoapify.com/geocoding-api).R-Map is an application where the user can plan their travel on the map. I created a [REST API](https://github.com/Tanju67/react-map-backend.git) for the backend of this application.
![R-Map](./src/assets/mainPage.gif)

1. UserCredential:
   - email:test@mail.com
   - password:secret123

## Features

### Sign In & Sign Out

The user must log in to use this application.

### Search Country

The user can search for the country they will travel to, select the time period they will spend in the country, and then select the places they will visit in that country on the map and add them to their travel planning.
![Search Country](./src/assets/search.gif)

### See Travel Detail

The user can see the details of the plan she made for the country she will travel to and can delete this plan if she wishes.

## Built With

- React JS
- Framer Motion
- React Router
- React Leaflet
- CSS Modules

## Getting Started

### Prerequisites

Install npm.

- npm
  ```
  npm install npm@latest -g
  ```
- You must clone [the backend repo](https://github.com/Tanju67/react-map-backend.git) of this application.
  ```
  git clone https://github.com/Tanju67/react-map-backend.git
  ```

### Installation

1. Clone the repo.
   ```
   git clone https://github.com/Tanju67/react-map-backend.git
   ```
2. Install NPM packages.
   ```
   npm install
   ```
3. Create the backend url in a .env file.
   ```
    VITE_BACKEND_URL=(your backend url)
    VITE_GEOCODING_API_KEY=(your api key)
   ```
4. Start the frontend server (Firstly you must start backend server).
   ```
   npm run dev
   ```
