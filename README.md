# HexCTF

An educational capture the flag (CTF) framework that allows for customizable competitions to be hosted on private servers.

## Features

- **Team-based Competition System**: Automatic team sorting and difficulty scaling to enhance user engagement and ensure fair competition
- **Dynamic Challenge Deployment**: Docker Management System that creates isolated environments for each CTF challenge
- **Customizable Experience**: Design your own CTF competitions with flexible challenge configurations
- **Private Hosting**: Run competitions on your own infrastructure for complete control

## Technology Stack

- **Frontend**: Built with Svelte for a responsive and interactive user experience
- **Containerization**: Docker for secure, isolated challenge environments
- **Backend**: SvelteKit for easy integration with Svelte

## Getting Started

### Prerequisites

- Node.js
- Docker and Docker Compose

### Installation

```bash
# Clone the repository
git clone https://github.com/x13B/hexctf.git
cd hexctf/hexctf

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Deployment

```bash
# Build for production
npm run build

# Start the server
npm run start
```

## Usage

### Setting Up a Competition

1. Configure your CTF parameters in the admin dashboard
2. Create and upload challenges
3. Set up teams or enable auto-team sorting
4. Launch the competition

### Managing Challenges

The Docker Management System automatically handles:
- Container creation for each challenge
- Secure isolation between participants
- Resource allocation and scaling
- Credential passing to teams
