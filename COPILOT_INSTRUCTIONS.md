# Frontend Development Instructions for AI Assistants

This document provides comprehensive guidance for AI assistants working on the Event Ticket Management Admin Portal frontend application.

## 🎯 Project Context

### Application Purpose
The admin portal is a React TypeScript application for managing event tickets. It provides administrators with tools to:
- Search and manage tickets efficiently
- Create and monitor events with analytics
- Handle user authentication and permissions
- View comprehensive dashboard analytics

### Target Users
- Event administrators and managers
- Event staff with varying permission levels
- System administrators

## 🏗️ Technical Architecture

### Project Root Context
- **Frontend Root**: `./demo-admin-portal/` (this directory)
- **Backend Integration**: Communicates with Spring Boot API at `../demo-ticket-service/`
- **Project Management**: Task definitions in `../tasks/`

### Technology Stack
```typescript
// Core Technologies
React 18+                    // Modern functional components with hooks
TypeScript                   // Type-safe development
Vite                        // Build tool and dev server
Tailwind CSS                // Utility-first CSS framework

// State Management
TanStack Query (React Query) // Server state management
React Context API           // Global state (auth, theme)
React Hook Form            // Form state management

// UI/UX Libraries
Headless UI                // Accessible component primitives
Heroicons                  // SVG icon library
React Hot Toast           // Toast notifications

// Development Tools
ESLint + TypeScript ESLint // Code linting
Prettier                  // Code formatting
Vitest                   // Testing framework
Testing Library          // Testing utilities
```

## 📁 Directory Structure & Conventions

### Folder Organization
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic components (Button, Card, Input)
│   ├── Layout.tsx       # Main app layout with navigation
│   └── ProtectedRoute.tsx # Authentication wrapper
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries and configurations
├── pages/               # Route components organized by feature
├── services/            # API layer - domain-specific services
├── types/               # TypeScript type definitions
└── test/                # Test configuration and utilities
```

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`, `EventCard.tsx`)
- **Hooks**: camelCase with "use" prefix (`useEvents.ts`, `useAuth.ts`)
- **Services**: camelCase (`authService.ts`, `eventService.ts`)
- **Types**: camelCase for files, PascalCase for interfaces (`types/index.ts`)
- **Pages**: PascalCase with "Page" suffix (`DashboardPage.tsx`)

## 🎨 Code Style & Patterns

### Component Architecture
```typescript
// Preferred: Functional components with TypeScript interfaces
interface ComponentProps {
  title: string
  isActive?: boolean
  onAction: (id: string) => void
}

const Component: React.FC<ComponentProps> = ({ title, isActive = false, onAction }) => {
  const [localState, setLocalState] = useState<string>('')
  
  return (
    <div className="component-class">
      {title}
    </div>
  )
}

export default Component
```

### State Management Patterns
```typescript
// Authentication: React Context
const { user, isAuthenticated, login, logout } = useAuth()

// Server State: TanStack Query
const { data: events, isLoading, error } = useEvents()
const mutation = useMutation({
  mutationFn: eventService.createEvent,
  onSuccess: () => queryClient.invalidateQueries(['events'])
})

// Form State: React Hook Form + Zod
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {}
})
```

### API Integration Pattern
```typescript
// Service layer pattern
export const eventService = {
  async getEvents(params?: EventFilters): Promise<PaginatedResponse<Event>> {
    return apiRequest(() => api.get('/events', { params }))
  },
  
  async createEvent(data: CreateEventRequest): Promise<Event> {
    return apiRequest(() => api.post('/events', data))
  }
}

// Custom hooks for data operations
export const useEvents = (filters?: EventFilters) => {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => eventService.getEvents(filters)
  })
}
```

## 🎨 UI/UX Guidelines

### Design System
```typescript
// Color scheme (Tailwind CSS)
primary: {
  50: '#eff6ff',   // Very light blue
  500: '#3b82f6',  // Main brand color
  600: '#2563eb',  // Hover states
  700: '#1d4ed8'   // Active states
}

// Typography
font-family: 'Inter' // Primary font
text-base: '16px'    // Body text
text-lg: '18px'      // Larger text
text-2xl: '24px'     // Headers
```

### Component Styling Patterns
```typescript
// Utility classes with Tailwind
className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"

// Custom CSS classes for complex components
// Use @apply in CSS files for repeated patterns
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

// Responsive design
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Accessibility Requirements
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

## 🔧 Development Workflows

### Component Development
1. **Create Interface**: Define TypeScript interfaces first
2. **Implement Component**: Use functional components with hooks
3. **Add Styling**: Apply Tailwind CSS classes
4. **Handle State**: Use appropriate state management
5. **Add Tests**: Write unit tests with Testing Library
6. **Document Props**: Include JSDoc comments

### API Integration Workflow
1. **Define Types**: Add TypeScript interfaces in `types/index.ts`
2. **Create Service**: Add API methods in appropriate service file
3. **Create Hook**: Wrap service calls with TanStack Query
4. **Handle Errors**: Use toast notifications for user feedback
5. **Update Cache**: Implement proper cache invalidation

### Form Implementation
```typescript
// Form schema with Zod
const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().datetime(),
  capacity: z.number().min(1)
})

// Form component implementation
const CreateEventForm: React.FC = () => {
  const form = useForm<CreateEventRequest>({
    resolver: zodResolver(createEventSchema)
  })
  
  const mutation = useCreateEvent()
  
  const onSubmit = (data: CreateEventRequest) => {
    mutation.mutate(data)
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

## 🧪 Testing Standards

### Unit Testing Approach
```typescript
// Component testing pattern
describe('EventCard', () => {
  const mockEvent: Event = {
    id: '1',
    title: 'Test Event',
    // ... other properties
  }
  
  it('should display event information', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Test Event')).toBeInTheDocument()
  })
  
  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    const onEdit = jest.fn()
    
    render(<EventCard event={mockEvent} onEdit={onEdit} />)
    await user.click(screen.getByRole('button', { name: /edit/i }))
    
    expect(onEdit).toHaveBeenCalledWith(mockEvent.id)
  })
})
```

### API Testing with MSW
```typescript
// Mock API responses
const handlers = [
  rest.get('/api/events', (req, res, ctx) => {
    return res(ctx.json({ data: mockEvents }))
  })
]

const server = setupServer(...handlers)
```

## 🔒 Security Considerations

### Authentication & Authorization
```typescript
// JWT token management
- Store tokens in localStorage (consider httpOnly cookies for production)
- Include tokens in Axios interceptors
- Handle token expiration gracefully
- Redirect unauthenticated users to login

// Protected routes
<ProtectedRoute>
  <AdminOnlyContent />
</ProtectedRoute>
```

### Data Validation
```typescript
// Always validate on both client and server
const userInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

// Sanitize user inputs
const sanitizedInput = DOMPurify.sanitize(userInput)
```

## 🚀 Performance Guidelines

### Bundle Optimization
```typescript
// Code splitting with React.lazy
const EventsPage = lazy(() => import('./pages/events/EventsPage'))

// Vite bundle analysis
npm run build
npm run preview
```

### React Performance
```typescript
// Memoization for expensive computations
const memoizedValue = useMemo(() => 
  expensiveCalculation(data), [data])

// Callback memoization
const memoizedCallback = useCallback((id: string) => 
  handleAction(id), [dependency])

// Component memoization
const MemoizedComponent = React.memo(Component)
```

### API Performance
```typescript
// Implement pagination
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['events'],
  queryFn: ({ pageParam = 0 }) => eventService.getEvents({ page: pageParam })
})

// Cache optimization
queryClient.setQueryData(['event', id], newEventData)
queryClient.invalidateQueries(['events'])
```

## 🛠️ Common Development Tasks

### Adding New Feature
1. **Plan Structure**: Identify components, pages, and services needed
2. **Define Types**: Add TypeScript interfaces
3. **Create API Service**: Implement backend communication
4. **Build Components**: Create reusable UI components
5. **Add Pages**: Implement route components
6. **Update Navigation**: Add routes and navigation links
7. **Write Tests**: Add comprehensive test coverage
8. **Update Documentation**: Document new features

### Debugging Common Issues
```typescript
// API debugging
console.log('API Request:', { url, data, headers })
console.log('API Response:', response.data)

// State debugging with React DevTools
// Use TanStack Query DevTools for cache inspection

// Error boundaries for graceful error handling
class ErrorBoundary extends React.Component {
  // Implementation
}
```

### Environment Configuration
```typescript
// Environment variables (prefix with VITE_)
VITE_API_URL=http://localhost:8080/api
VITE_ENV=development
VITE_ENABLE_DEVTOOLS=true

// Access in code
const apiUrl = import.meta.env.VITE_API_URL
```

## 📊 Key Metrics & Monitoring

### Development Metrics
- **Bundle Size**: Monitor with Vite build analyzer
- **Performance**: Use React DevTools Profiler
- **Test Coverage**: Maintain >80% coverage
- **Type Safety**: Zero TypeScript errors
- **Accessibility**: WCAG 2.1 AA compliance

### User Experience Metrics
- **Loading States**: Show appropriate loading indicators
- **Error Handling**: User-friendly error messages
- **Response Times**: API calls under 2 seconds
- **Mobile Responsiveness**: Test on various screen sizes

## 🔄 Integration Points

### Backend API Integration
- **Base URL**: Configurable via `VITE_API_URL`
- **Authentication**: JWT tokens in Authorization header
- **Error Handling**: Centralized error interceptors
- **Type Safety**: Shared types between frontend and backend

### Related Systems
- **Task Management**: Integration with Task Master AI system
- **Documentation**: Links to backend API documentation
- **Deployment**: Docker containerization for consistent environments

## 📚 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query Guide](https://tanstack.com/query/latest)

### Styling & UI
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Headless UI Components](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🤝 Collaboration Guidelines

When working on this frontend application:

1. **Follow TypeScript-first approach** - Define interfaces before implementation
2. **Use existing patterns** - Follow established component and service patterns
3. **Maintain test coverage** - Write tests for new functionality
4. **Consider accessibility** - Ensure all users can access features
5. **Optimize for performance** - Use React best practices for re-renders
6. **Document complex logic** - Add JSDoc comments for complex components
7. **Follow responsive design** - Test on multiple screen sizes
8. **Handle errors gracefully** - Provide meaningful user feedback

Remember: This is a production-ready application that prioritizes user experience, type safety, and maintainable code architecture.
