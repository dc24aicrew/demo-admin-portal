# Event Ticket Management - Admin Portal

A modern React TypeScript application for managing event tickets with an intuitive admin interface. Built with React 18+, TypeScript, and Tailwind CSS for optimal developer experience and production performance.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React Version](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.0.0-blue.svg)


## 🏗️ Project Overview

This admin portal is designed for event administrators to efficiently manage tickets, events, and user interactions. The application provides a clean, responsive interface focused on essential ticket management operations including search, status updates, and analytics.

### Key Features

- **🔐 Authentication System**: Secure JWT-based authentication with role management
- **🎫 Ticket Management**: Search, view, and update ticket statuses efficiently
- **📅 Event Management**: Create, edit, and monitor events with real-time analytics
- **📊 Dashboard Analytics**: Comprehensive overview with key metrics and insights
- **👥 User Management**: Handle user accounts and permissions
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔍 Advanced Search**: Powerful filtering and search capabilities
- **⚡ Real-time Updates**: Live data synchronization with the backend

## 🛠️ Tech Stack

### Core Technologies
- **React 18+** - Modern functional components with hooks
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### State Management & Data Fetching
- **TanStack Query (React Query)** - Powerful data synchronization and caching
- **React Context API** - Authentication and global state management
- **React Hook Form** - Performant forms with minimal re-renders
- **Zod** - TypeScript-first schema validation

### UI Components & Styling
- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Tailwind CSS Plugins**: Forms, Typography, Container Queries
- **React Hot Toast** - Elegant toast notifications

### Developer Experience
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting for consistency
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, Input)
│   ├── Layout.tsx      # Main application layout
│   └── ProtectedRoute.tsx # Route protection wrapper
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication state management
├── hooks/              # Custom React hooks
│   ├── useEvents.ts    # Event-related data operations
│   └── useTickets.ts   # Ticket-related data operations
├── lib/                # Utility libraries
│   ├── api.ts          # Axios configuration and interceptors
│   └── utils.ts        # Helper functions and utilities
├── pages/              # Application pages/routes
│   ├── auth/           # Authentication pages
│   ├── events/         # Event management pages
│   ├── tickets/        # Ticket management pages
│   ├── profile/        # User profile pages
│   ├── settings/       # Application settings
│   ├── DashboardPage.tsx # Main dashboard
│   └── NotFoundPage.tsx  # 404 error page
├── services/           # API service layer
│   ├── auth.ts         # Authentication API calls
│   ├── events.ts       # Event API operations
│   └── tickets.ts      # Ticket API operations
├── types/              # TypeScript type definitions
│   └── index.ts        # Centralized type exports
└── test/               # Test configuration
    └── setup.ts        # Testing environment setup
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Git** for version control
- Backend service running on `http://localhost:8080/api` (see [backend README](../demo-ticket-service/README.md))

### Installation

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd demo-admin-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run preview          # Preview production build locally

# Building
npm run build            # Build for production
npm run clean            # Clean build artifacts

# Code Quality
npm run lint             # Run ESLint
npm run lint:check       # Check linting without fixing
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without fixing
npm run type-check       # TypeScript type checking

# Testing
npm run test             # Run tests
npm run test:ui          # Run tests with UI
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate test coverage report
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8080/api

# Environment
VITE_ENV=development

# Development Tools
VITE_ENABLE_DEVTOOLS=true
```

### TypeScript Configuration

The project uses multiple TypeScript configurations:
- `tsconfig.json` - Main configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js/Vite specific settings

### Tailwind CSS

Custom configuration in `tailwind.config.js`:
- Extended color palette with primary theme
- Custom font configuration (Inter)
- Additional plugins for forms, typography, and container queries

## 🏗️ Architecture Patterns

### Component Architecture
- **Functional Components**: Modern React patterns with hooks
- **Compound Components**: Complex UI components like Card with sub-components
- **Composition over Inheritance**: Flexible component design
- **TypeScript Interfaces**: Strict typing for props and state

### State Management Strategy
- **Local State**: React useState for component-specific state
- **Global State**: React Context for authentication and theme
- **Server State**: TanStack Query for API data management
- **Form State**: React Hook Form for complex form handling

### API Layer Design
- **Centralized Configuration**: Single Axios instance with interceptors
- **Service Layer**: Domain-specific API services (auth, events, tickets)
- **Error Handling**: Global error interceptors with user-friendly messages
- **Type Safety**: Full TypeScript integration with API responses

## 🎨 UI/UX Guidelines

### Design System
- **Color Palette**: Primary blue theme with semantic colors
- **Typography**: Inter font family for modern, readable text
- **Spacing**: Consistent spacing scale following Tailwind conventions
- **Components**: Reusable UI components with consistent styling

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Standard Tailwind breakpoints (sm, md, lg, xl)
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly**: Appropriate touch targets for mobile interaction

### Accessibility
- **WCAG 2.1**: Following web accessibility guidelines
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meeting AA contrast requirements

## 🧪 Testing Strategy

### Unit Testing
- **Vitest**: Fast, modern testing framework
- **Testing Library**: User-centric testing utilities
- **Mock Service Worker**: API mocking for tests
- **Coverage Reports**: Comprehensive test coverage tracking

### Testing Patterns
```tsx
// Example test structure
describe('Component', () => {
  it('should render correctly', () => {
    render(<Component {...props} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  
  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    render(<Component {...props} />)
    await user.click(screen.getByRole('button'))
    expect(mockFunction).toHaveBeenCalled()
  })
})
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build production image
docker build -t admin-portal .

# Run container
docker run -p 3000:80 admin-portal
```

### Environment-Specific Builds
- **Development**: Hot module replacement, source maps, dev tools
- **Production**: Optimized bundles, code splitting, compression

## 🔗 API Integration

### Backend Communication
- **Base URL**: Configurable via environment variables
- **Authentication**: JWT token-based with automatic refresh
- **Error Handling**: Centralized error management with toast notifications
- **Request/Response Types**: Fully typed API interfaces

### Key API Endpoints
```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me

// Events
GET    /api/events
POST   /api/events
GET    /api/events/:id
PUT    /api/events/:id

// Tickets
GET    /api/tickets
GET    /api/tickets/:id
PATCH  /api/tickets/:id/status
```

## 📚 Key Dependencies

### Production Dependencies
```json
{
  "@tanstack/react-query": "^5.77.1",
  "react": "^19.1.0",
  "react-router-dom": "^7.6.1",
  "tailwindcss": "^3.4.17",
  "axios": "^1.9.0",
  "react-hook-form": "^7.56.4",
  "zod": "^3.25.28"
}
```

### Development Dependencies
```json
{
  "typescript": "~5.8.3",
  "vite": "^6.3.5",
  "vitest": "^3.1.4",
  "@testing-library/react": "^16.3.0",
  "eslint": "^9.25.0",
  "prettier": "^3.4.2"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   ```bash
   # Check backend service is running
   curl http://localhost:8080/api/health
   
   # Verify environment variables
   echo $VITE_API_URL
   ```

2. **Build Failures**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Clear build cache
   npm run clean
   ```

3. **TypeScript Errors**
   ```bash
   # Run type checking
   npm run type-check
   
   # Restart TypeScript server in IDE
   ```

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes with proper TypeScript types
3. Add/update tests for new functionality
4. Run linting and formatting
5. Submit pull request with clear description

### Code Standards
- **TypeScript**: Strict mode enabled, no implicit any
- **ESLint**: React hooks rules, TypeScript recommended
- **Prettier**: Consistent code formatting
- **Naming**: PascalCase components, camelCase variables/functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Documentation

- [Backend Service Documentation](../demo-ticket-service/README.md)
- [Project Root Documentation](../README.md)
- [Task Management Guide](../tasks/README.md)
- [Product Requirements Document](../scripts/prd.txt)
  },
})
```
