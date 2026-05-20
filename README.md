# Nuxt Weather App

A mobile-first web application designed for real-time weather tracking on smartphones, built as a personal project to practice Nuxt ^4.2, Vue, TypeScript, and Tailwind CSS.

## Features
- Mobile-oriented UX/UI design
- Dynamic data fetching from Visual Crossing Weather API
- Fully typed with TypeScript

## Setup & Installation

### 1. Clone the repository
```bash
git clone [https://github.com/kinnaamf/nuxt-weather-app.git](https://github.com/kinnaamf/nuxt-weather-app.git)
cd nuxt-weather-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Environment Variables
Create a .env file in the root directory and add your Visual Crossing API credentials:
```
BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
API_KEY=your_actual_api_key_here
```
### 4. Development Server
Start the development server on http://localhost:3000:
```Bash
npm run dev
# or
npx nuxt dev
```
