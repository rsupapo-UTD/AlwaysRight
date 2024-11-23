const fs = require('fs');

const readmeContent = `
AlwaysRight Demo
================

This project is a demo application built with Next.js, React, and MySQL. It provides a dashboard with various analytics and charts.

Prerequisites
-------------
Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed. You can download it from nodejs.org.
- MySQL: Ensure you have a MySQL server running and accessible.

Installation
------------
1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd alwaysright-demo
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Create a .env file in the root directory.
   - Add the following environment variables:
     \`\`\`plaintext
     DB_HOST=<your-database-host>
     DB_USER=<your-database-user>
     DB_PASSWORD=<your-database-password>
     DB_NAME=<your-database-name>
     NEXT_PUBLIC_AUTH0_DOMAIN=<your-auth0-domain>
     NEXT_PUBLIC_AUTH0_CLIENT_ID=<your-auth0-client-id>
     \`\`\`

Running the Application
-----------------------
1. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

   This command will start the Next.js development server. You can access the application at http://localhost:3000.

2. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

   This command will compile the application for production.

3. Start the production server:
   \`\`\`bash
   npm start
   \`\`\`

   This command will start the application in production mode.

Additional Commands
-------------------
- Lint the code:
  \`\`\`bash
  npm run lint
  \`\`\`

  This command will run ESLint to check for code quality issues.

Project Structure
-----------------
- \`src/pages\`: Contains the Next.js pages.
- \`src/components\`: Contains the React components used throughout the application.
- \`src/utils\`: Contains utility functions and configurations.
- \`src/styles\`: Contains global styles.

Troubleshooting
---------------
- Ensure your MySQL server is running and the credentials in the .env file are correct.
- If you encounter any issues, check the console for error messages and ensure all dependencies are installed correctly.

License
-------
This project is licensed under the ISC License.
`;

fs.writeFile('README.txt', readmeContent, (err) => {
  if (err) {
    console.error('Error writing to README.txt:', err);
  } else {
    console.log('README.txt has been created successfully.');
  }
});