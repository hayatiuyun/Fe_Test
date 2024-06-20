
# Routes Management Applications

## Getting Started

To get this Next.js project up and running locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/hayatiuyun/fe_test.git
   ```
2. Navigate into the project directory:
```bash
cd fe_test
```
3. Install dependencies using npm:
```
npm install
```

### Setup Environment Variables

This project requires the following environment variables to be set for configuration:

* `NEXT_PUBLIC_API_URL`: This is the base URL for API endpoints.
* `NEXTAUTH_SECRET`: Secret used for encrypting cookies. Generate a secure random string for this.
* `NEXTAUTH_URL`: The base URL of your application used by NextAuth.

Create a `.env.local` file in the root of project and add these variables:

```
NEXT_PUBLIC_API_URL=https://your-api-url.com
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
```
Replace https://your-api-url.com with the actual URL of your API and http://localhost:3000 with your local development URL.

### Running Development Server
Once the environment variables are set, you can start the development server:

```
npm run dev
```
### Additional Command

* `npm run build`: Builds the production application in the `.next` folder.
* `npm start`: Starts the Next.js server in production mode.