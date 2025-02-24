# DevLinkUp Frontend

DevLinkUp is a web application designed to connect developers based on their skills, interests, and project needs. It serves as a networking platform where developers can collaborate, share ideas, and work on projects together. This repository contains the frontend code for the DevLinkUp platform.

## Features

- User authentication (Sign up, Log in, Log out)
- Profile creation and management
- Browse developer profiles based on skills and interests
- Match with other developers for collaboration
- Send and receive connection requests
- Real-time chat with connected developers

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Frontend build tool for fast development
- **Axios**: HTTP client for API requests
- **Socket.IO**: Real-time communication for messaging

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
https://github.com/KhalkarYash/dev-link-up-frontend.git
```

2. Navigate to the project directory:

```bash
cd dev-link-up-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## Building for Production

To create a production build of the project, run the following command:

```bash
npm run build
```

This will create a `dist` folder with the production-ready files.

## Deployment

To deploy the frontend to a hosting platform like Vercel, Render, or GitHub Pages, follow the specific platform's deployment guidelines. Ensure the `base` in `vite.config.js` is set properly if deploying to GitHub Pages.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
