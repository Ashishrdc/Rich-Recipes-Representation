# Rich-Recipes-Representation
This app lets users explore and validate recipes using the Rich Recipe Representation (R3). Built with React and Node.js, it displays detailed recipes with steps, ingredients, and tools. Ingredient images are fetched from Pexels and Unsplash. The app also provides validation metrics to ensure recipe consistency and completeness.

## Applications Structure

1. **image-server**: Backend server to provide static images.
2. **r3-metrics-client**: Frontend built with React to display and validate recipes.

## Setup Instructions

### 1. Running the Image Server

To run the image server:

1. Navigate to the `image-server` directory:
   ```bash
   cd image-server
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```

### 2. Running the Frontend (R3-Metrics)

To run the React frontend:

1. Navigate to the `r3-metrics` directory:
   ```bash
   cd r3-metrics
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run start
   ```

The frontend will be available at `http://localhost:3000`.

---
This setup will allow you to browse recipes, view ingredient images, and validate recipes based on R3 metrics.
