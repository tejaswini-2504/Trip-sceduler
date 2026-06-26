# TripWise – Smart Tourism Trip Planner

TripWise is a full stack tourism trip planner built with React, Node.js, Express, MongoDB, Tailwind CSS, and Leaflet.js. It uses local static tourism datasets to generate day-wise itineraries, restaurant suggestions, route estimates, and map visualizations.

## Features

- User registration and login with JWT
- Destination search and smart itinerary generation
- Day-wise plan, restaurants, budget estimates, and travel distance
- OpenStreetMap and Leaflet map integration
- Saved trips and profile management
- Responsive UI with Tailwind CSS and Framer Motion

## Project Structure

- `client/` — React frontend
- `server/` — Express backend and MongoDB models

## Setup

### Backend

1. Create `.env` in `server/`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

2. Install dependencies:

```bash
cd server
npm install
```

3. Start backend:

```bash
npm run dev
```

### Frontend

1. Install dependencies:

```bash
cd client
npm install
```

2. Start frontend:

```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/trips/generate`
- `GET /api/trips/:destination`
- `GET /api/trips/user/all`
- `DELETE /api/trips/:id`

## Notes

- The app uses static datasets in `server/data/` for all destinations.
- No paid external APIs are required.
