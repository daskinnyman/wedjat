# Wedjat

This is a mono-repo project managed with pnpm.

## Project Structure

```
wedjat/
├── apps/
│   ├── server/          # Backend sub-project
│   │   ├── Tech Stack: Hono + Prisma + TypeScript
│   │   └── Based on https://hono.dev/docs/
│   └── extension/       # Chrome extension sub-project
│       ├── Tech Stack: crxjs + TypeScript
│       └── Based on https://crxjs.dev/guide/installation/create-crxjs
├── packages/
│   └── shared/          # Shared sub-project
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Tech Stack

### Apps

- **server**: Backend service using Hono framework, Prisma ORM, and TypeScript
- **extension**: Chrome browser extension using crxjs and TypeScript

### Packages

- **shared**: Shared code and utility libraries

## Chrome Extension Architecture

### Overview

The Chrome extension follows a modern, efficient architecture that eliminates unnecessary background script API calls while maintaining proper separation of concerns.

### Key Components

#### 1. Content Script (`src/content/main.tsx`)

- **Purpose**: Interacts with web page content
- **Responsibilities**:
  - Captures user text selection
  - Gets current page URL
  - Responds to messages from extension UI
- **Communication**: Uses `chrome.runtime.onMessage` to handle `GET_SELECTION` requests

#### 2. Background Script (`src/background/main.ts`)

- **Purpose**: Handles extension lifecycle events
- **Responsibilities**:
  - Extension installation events
  - Extension startup events
  - Basic message routing (for future extensibility)
- **Note**: No longer handles API calls - simplified for performance

#### 3. API Layer (`src/api/`)

- **HTTP Client** (`httpClient.ts`): Generic HTTP client with error handling
- **Query Service** (`services/queryService.ts`): Business logic for API operations
- **Query Functions** (`query.ts`): Direct API function exports

#### 4. React Query Integration (`src/hooks/`)

- **useSendQuery**: Mutation hook for sending queries
- **useQueryData**: Query hook for data fetching
- **useHealthCheck**: Health check monitoring
- **usePageData**: Page data management with Chrome APIs

#### 5. State Management

- **TanStack Query**: Handles server state, caching, and synchronization
- **React Hooks**: Local component state management
- **Chrome Extension APIs**: Cross-tab communication

### Data Flow

```
User Selection → Content Script → usePageData → useSendQuery → QueryService → HTTP Client → Server
     ↑                                                                                        ↓
     └────────────────────── Response ───────────────────────────────────────────────────────┘
```

### Key Benefits of Current Architecture

1. **Direct API Calls**: No unnecessary background script overhead
2. **Efficient State Management**: TanStack Query handles caching and synchronization
3. **Clean Separation**: Content script for page interaction, hooks for business logic
4. **Performance**: Reduced message passing between extension components
5. **Maintainability**: Clear responsibility boundaries and modern React patterns

### Communication Patterns

#### Content Script ↔ Extension UI

- **Method**: `chrome.tabs.sendMessage`
- **Use Case**: Getting page selection and URL data
- **Direction**: Extension UI → Content Script

#### Extension UI ↔ Server

- **Method**: Direct HTTP calls via fetch API
- **Use Case**: Sending queries and receiving responses
- **Direction**: Bidirectional (Extension UI ↔ Server)

#### Background Script

- **Method**: Event listeners only
- **Use Case**: Extension lifecycle management
- **Direction**: Extension system → Background Script

## Development Environment Setup

1. Ensure pnpm is installed
2. Run `pnpm install` in the root directory to install all dependencies
3. All sub-projects will automatically establish links

## Workspace Configuration

`pnpm-workspace.yaml` configuration:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

## Sub-project Development

Each sub-project has its own `package.json` file and can independently manage dependencies and scripts. pnpm automatically handles dependency linking within the workspace.

## Recent Architecture Improvements

### Background Script Simplification

- **Before**: Background script handled API calls and message routing
- **After**: Background script only handles extension lifecycle events
- **Benefit**: Reduced complexity and improved performance

### Direct API Integration

- **Before**: API calls went through background script message passing
- **After**: Direct HTTP calls from React hooks using TanStack Query
- **Benefit**: Better error handling, caching, and state management

### Modern React Patterns

- **Implementation**: Custom hooks with proper separation of concerns
- **State Management**: TanStack Query for server state, React hooks for local state
- **Error Handling**: Comprehensive error boundaries and user feedback
