# BloomNet - Food Sharing & Surplus Redistribution Platform

## Overview

BloomNet is a social impact platform that connects food donors (restaurants, caterers, individuals) with NGOs and shelters in real-time through geolocation-based matching. The platform aims to reduce food waste while addressing food insecurity by facilitating instant connections between surplus food providers and organizations serving communities in need.

The application provides:
- Real-time donation submission with automatic matching to nearest active requests
- Live map visualization showing donors and recipient organizations
- Dashboard for tracking donation and request statuses
- Mobile-first responsive design optimized for on-the-go donations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing

**UI Component Strategy:**
- Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme management supporting light/dark modes
- New York style variant with custom color palette emphasizing trust (green primary) and warmth

**State Management:**
- TanStack Query (React Query) for server state management, caching, and automatic refetching
- React Hook Form with Zod for type-safe form validation
- Context API for theme management

**Key Design Decisions:**
- Mobile-first approach as most donations occur on mobile devices
- Glass-morphism effects on hero section for modern, engaging aesthetic
- Typography: Inter for headings/UI, Open Sans for body text (balancing modernity with warmth)
- Consistent spacing using Tailwind's limited scale (2, 4, 8, 12, 16, 20) for visual harmony

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for the REST API
- HTTP server creation for potential WebSocket upgrades
- Custom middleware for request logging and JSON body parsing with raw body preservation

**API Design:**
- RESTful endpoints following resource-based conventions
- `/api/donations` - CRUD operations for food donations
- `/api/requests` - CRUD operations for NGO/shelter requests
- Automatic matching logic triggered on donation creation

**Data Layer Abstraction:**
- Storage interface (`IStorage`) defining contract for data operations
- In-memory implementation (`MemStorage`) for development/testing
- Seeded sample data for immediate functionality demonstration
- Prepared for PostgreSQL migration via Drizzle ORM

**Matching Algorithm:**
- Haversine formula for calculating geographic distances between coordinates
- Configurable maximum matching distance (default 5km radius)
- ETA calculation based on assumed 30 km/h city travel speed
- Priority given to nearest active request when donation is submitted

### Database Schema (Drizzle ORM)

**Tables:**

`donations` table:
- Captures food type, quantity, pickup time, location (address + coordinates)
- Status workflow: pending → assigned → completed
- Links to matched request via `matchedRequestId`
- Contact information for coordination

`requests` table:
- Organization details, requirement type, quantity needed
- Location data (address + coordinates)
- Status workflow: active → fulfilled/inactive
- Contact information for donor coordination

**Validation Strategy:**
- Zod schemas generated from Drizzle table definitions via `drizzle-zod`
- Runtime validation on API endpoints
- Type safety across frontend and backend through shared schema

**Rationale for Drizzle:**
- Type-safe SQL query builder with excellent TypeScript integration
- Lightweight compared to traditional ORMs
- Easy migration path from development to production databases
- Schema-first approach ensuring consistency

### Geolocation Features

**Map Integration:**
- Leaflet for interactive map rendering
- React-Leaflet for declarative React components
- Custom SVG markers distinguishing donors (green) from NGOs (blue)
- Popup cards showing entity details and calculated distances
- 5km radius circles for visualizing matching zones

**Location Services:**
- Browser Geolocation API for automatic user positioning
- Manual address input with latitude/longitude conversion expected from future geocoding service
- Distance calculations performed both client-side (for display) and server-side (for matching)

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Accessible, unstyled component primitives (dialogs, dropdowns, tooltips, etc.)
- **Lucide React** - Icon system for consistent visual language
- **Class Variance Authority (CVA)** - Type-safe variant styling for component variations

### Mapping & Geolocation
- **Leaflet** - Open-source map rendering library
- **React-Leaflet** - React wrapper for Leaflet maps
- **@types/leaflet** - TypeScript definitions for type safety

### Form Management
- **React Hook Form** - Performant form state management with minimal re-renders
- **Zod** - Schema validation library
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Data Fetching & State
- **TanStack Query** - Server state management with automatic caching and background updates

### Database & ORM
- **Drizzle ORM** - Type-safe SQL toolkit
- **Drizzle Kit** - CLI for schema management and migrations
- **@neondatabase/serverless** - Serverless PostgreSQL driver (prepared for production)
- **connect-pg-simple** - PostgreSQL session store for Express (dependency present)

### Build & Development Tools
- **Vite** - Next-generation frontend build tool
- **TypeScript** - Static type checking
- **PostCSS & Autoprefixer** - CSS processing
- **ESBuild** - Fast JavaScript bundler for server code

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal** - Enhanced error reporting
- **@replit/vite-plugin-cartographer** - Development tool integration
- **@replit/vite-plugin-dev-banner** - Development environment indicators

### Utility Libraries
- **date-fns** - Date manipulation and formatting
- **clsx & tailwind-merge** - Conditional className composition
- **nanoid** - Unique ID generation
- **cmdk** - Command palette component

### Future Integration Points
- Geocoding API (Google Maps, Mapbox) for address-to-coordinate conversion
- SMS/Email notification service for match alerts
- Payment processing for donation tracking/receipts
- Analytics platform for impact metrics