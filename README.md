# FindYourHome

A full-stack MERN (MongoDB, Express, React, Node.js) project that helps users rent or buy properties, utilizing Prisma as the ORM.

## Key Features

- Developed a full-stack web application using React and SCSS for the frontend, with Node.js, Express, Prisma, and MongoDB for the backend.
- Implemented user authentication and authorization using JWT, allowing secure profile creation and management.
- Built a user-friendly platform where people can easily post and find homes for sale or rent, with profile creation and post management features.

## Project Structure

```
findyourhome/
├── api/            # Backend server
└── frontend/       # React frontend
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/property-marketplace.git
   cd property-marketplace
   ```

2. Install dependencies
   ```
   # Install backend dependencies
   cd api
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the `api` directory and add necessary environment variables.

### Running the Application

1. Start the server
   ```
   cd api
   node app.js
   ```

2. In a new terminal, start the frontend
   ```
   cd frontend
   npm run dev
   ```

The server will run on the port specified in your `app.js` file, and the frontend will be accessible through the URL provided by the Vite development server.

## Usage

After starting both the server and frontend, you can access the application through the URL provided by the frontend development server. Create an account to start posting properties or browsing listings.
