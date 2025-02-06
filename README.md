A React-based GitHub commit difference viewer built with Vite. This project allows users to view commit details, author information, and file changes in a structured and interactive format.

## Requirements
- npm (Node JS) 
- Refer https://docs.npmjs.com/downloading-and-installing-node-js-and-npm for installation
## Features

- Fetches and displays commit details including author, date, message, and parent commit.
- Shows file-level diffs with expandable sections for individual file changes.
- Highlights added (+) and removed (-) lines in the diff viewer.
- Uses environment variables for API configuration.
- Built with Vite for fast development and optimized builds.

## Installation

Clone the Repository

```bash 
git clone https://github.com/lavan-fs/git-difference-fe
cd git-difference-fe
```

Install Dependencies
```bash
npm install
```
## Set Up Environment Variables
Create a .env file in the root directory and add the following:
```
VITE_BE_URL=http://your-backend-api-url
```


Run the Development Server

    npm run dev
The application should now be accessible at http://localhost:5173.

Configuration

    The app relies on a backend API for fetching commit details and file diffs.
    API Endpoints:
        Commit details: ${VITE_BE_URL}/repositories/{owner}/{repo}/commits/{commit}/details
        File diffs: ${VITE_BE_URL}/repositories/{owner}/{repo}/commits/{commit}/diff

## Build and Deployment

To create a production build:
```
npm run build
```
The output will be in the dist folder, which can be deployed to a static hosting service.