# HomeScreen Component Structure

This directory contains the organized components for the HomeScreen, split into smaller, reusable components to improve maintainability and reduce code duplication.

## Structure

```
HomeScreen/
├── components/
│   ├── Header.tsx              # Header section with title and subtitle
│   ├── SearchBar.tsx           # Search input with clear functionality
│   ├── SearchResultsHeader.tsx # Search results count display
│   ├── Categories.tsx          # Categories grid section
│   ├── LoadingCard.tsx         # Skeleton loading components
│   ├── FeaturedPlaceCard.tsx   # Individual featured place card
│   ├── FeaturedPlaces.tsx      # Featured places horizontal scroll section
│   ├── EventCard.tsx           # Individual event card
│   ├── Events.tsx              # Events list section
│   └── index.ts                # Component exports
├── hooks/
│   └── useHomeData.ts          # Custom hook for data processing logic
├── index.tsx                   # Main HomeScreen component
├── styles.ts                   # Shared styles
└── README.md                   # This file
```

## Components

### Header

Displays the app title and subtitle with proper theming.

### SearchBar

Handles search input with clear button functionality and RTL support.

### SearchResultsHeader

Shows search results count when a search query is active.

### Categories

Displays a grid of category cards (restaurants, cafes, bars, entertainment).

### LoadingCard

Provides skeleton loading states for both featured places and events.

### FeaturedPlaceCard

Individual card component for featured places with image, title, rating, and favorite functionality.

### FeaturedPlaces

Horizontal scrollable section containing featured place cards with loading states.

### EventCard

Individual card component for events with date, title, location, and favorite functionality.

### Events

Vertical list section containing event cards with loading states.

## Hooks

### useHomeData

Custom hook that handles:

- Data filtering based on search query
- Categories generation
- Featured places data transformation
- Upcoming events data transformation
- Localization helper functions

## Benefits

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other screens
3. **Maintainability**: Easier to maintain and debug individual components
4. **Testability**: Each component can be tested independently
5. **Performance**: Better memoization opportunities with smaller components
6. **Code Organization**: Clear structure makes it easier to find and modify code

## Usage

The main HomeScreen component orchestrates all these components and handles:

- Data fetching and state management
- Navigation logic
- Event handlers
- Theme and language context integration

All styling is handled through the shared `styles.ts` file, eliminating inline styles and ensuring consistency.
