# Node.js Backend Boilerplate

This repository provides a production-ready boilerplate for a Node.js backend server. It includes environment-specific configurations, error logging, and middleware support. This structure helps you quickly set up a robust and scalable server for production-level applications.

## Features

- **Environment Switching**: Use `NODE_ENV` to switch between development and production configurations.
- **Error Handling**: Built-in error handling middleware to capture, log, and manage errors gracefully.
- **Custom Scripts**: Includes `start:dev` and `start:prod` commands for easy environment-specific server startup.
- **Logging**: Ready-to-use error logging utility.

## Installation

Clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/yourusername/nodejs-backend-boilerplate.git
cd nodejs-backend-boilerplate
npm install
```

## Project Structure

```bash
├── server.js               # Main entry point
├── package.json            # NPM configuration and scripts
├── /config                 # Environment-specific configuration files
│   ├── .env                # Default environment variables (production)
│   ├── .env.dev            # Development environment variables
├── /utils
│   └── error-handler.js    # Custom error handling middleware
├── /logs                   # Error log storage
└── /src                    # Main application logic
    ├── /routes             # API routes
    ├── /controllers        # Request handlers
    └── /models             # Database models
```

## Scripts

Here are the available scripts for different environments:

- **Start Development Server**: Runs the server with `NODE_ENV`=dev.

```bash
npm run start:dev
```

- **Start Production Server**: Runs the server with `NODE_ENV`=prod.

```bash
npm run start:prod
```

These scripts automatically load environment-specific configuration files, such as `.env` or `.env.dev`, and start the server accordingly.

### `package.json` Scripts

```json
"scripts": {
  "start:dev": "NODE_ENV=development node server.js",
  "start:prod": "NODE_ENV=prod node server.js"
}
```

## Environment Variables

This boilerplate uses environment variables to configure server settings. The environment can be easily switched by changing the `NODE_ENV` variable.

### Environment Variable Setup

- `.env`: Contains production variables.
- `.env.dev`: Contains development variables.

Example `.env` file:

```makefile
PORT=8080
DB_URL=mongodb://prod-db-url
APP_SECRET=myprodsecret
```

## Error Handling

The boilerplate includes a custom error handling middleware that logs errors and responds to the client appropriately.

To use the error handling middleware, simply import and apply it in your `server.js` file:

```javascript
const express = require('express');
const app = express();

// Import error handling middleware
const HandleErrors = require('./utils/error-handler');

// Apply the middleware to the app
app.use(HandleErrors);

// Example route (for demonstration purposes)
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

## Error Logging

Errors are logged using the error-handler.js module, which can be customized to write logs to a file, database, or external logging service.