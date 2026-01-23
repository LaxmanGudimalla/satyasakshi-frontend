# SatyaSakshi Frontend
A comprehensive React-based vehicle management and verification system with role-based dashboards for Super Admins, Admins, Field Executives, and Customers.

## Quick Start
### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Running
```bash
# Clone the repository
git clone <repository-url>
cd satyasakshi-frontend

# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start
```

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Overview

SatyaSakshi is a multi-role vehicle management platform that handles vehicle verification, recovery tracking, challan checks, insurance status, vehicle cloning detection, re-registration, and service history management.

## Tech Stack

- **React 19** - UI Framework
- **React Router 7** - Client-side routing
- **Tailwind CSS 3** - Styling
- **React Icons** - Icon library
- **Node.js/npm** - Package management

## Features

- **Authentication** - Secure login and signup
- **Super Admin Dashboard** - System-wide administration and user management
- **Admin Dashboard** - Vehicle verification and management tools
  - Challan checks
  - Re-registration tracking
  - Service history
  - Cloned vehicle detection
  - Insurance status
  - FASTag management
  - Vehicle recovery management
- **Field Executive Dashboard** - On-field operations
- **Customer Dashboard** - Personal vehicle information access
- **Real-time Verification** - Vehicle data validation system
- **Reports & Logs** - Comprehensive audit trails

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/             # Page components organized by role
│   ├── adminPages/    # Admin-specific pages
│   ├── superAdminPages/ # Super Admin pages
│   └── dashboards/    # Role-based dashboards
├── services/          # API integration services
├── helpers/           # Utility functions
├── assets/            # Images, fonts, etc.
└── App.js             # Main routing configuration
```

## Development

The application uses React Router for navigation with role-based protected routes. All API calls are centralized in the `services/` directory for maintainability.

## License

Private - SatyaSakshi

**Author:** Laxman Gudimalla | **Updated:** January 2026