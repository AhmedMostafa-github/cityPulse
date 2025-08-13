# CityPulse - React Native App

A modern, feature-rich React Native application for discovering places and events in your city with support for light/dark mode and Arabic/English languages.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture & Implementation](#architecture--implementation)
- [Technical Stack](#technical-stack)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Internationalization](#internationalization)
- [Theming System](#theming-system)
- [Navigation Structure](#navigation-structure)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

CityPulse is a comprehensive React Native application built with Expo that provides users with a modern interface to discover and explore local events and venues. The app features a robust authentication system, multi-language support, theme switching, and offline capabilities.

## ✨ Features

### Core Features

- **Multi-language Support**: English and Arabic with RTL layout support
- **Theme System**: Light and dark mode with customizable color schemes
- **Offline Caching**: Cache last search results for offline access
- **Responsive Design**: Mobile-first design with modern UI components
- **Real-time Data**: Integration with external APIs for live event data

### Authentication & User Management

- **Complete Authentication System**: Signup and login with AsyncStorage persistence
- **Credential Management**: Secure storage of user credentials
- **Session Persistence**: Users stay logged in until they sign out
- **User Preferences**: Theme and language preferences saved per user
- **Favorites System**: Personalized favorites for places and events

### Navigation & UI

- **Bottom Tab Navigation**: Intuitive navigation between main sections
- **Stack Navigation**: Deep linking and screen transitions
- **Modern UI Components**: Animated, gesture-enabled components
- **Search Functionality**: Real-time search with filters

## 🏗️ Architecture & Implementation

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThemedButton.tsx    # Theme-aware button component
│   ├── ThemedCard.tsx      # Card component with theme support
│   └── ValidatedInput.tsx  # Form input with validation
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx    # Theme management
│   ├── LanguageContext.tsx # Language switching
│   └── AuthContext.tsx     # Authentication state
├── hooks/              # Custom React hooks
│   ├── useAuthForm.ts      # Form state management
│   └── useOfflineCache.ts  # Offline data caching
├── screens/            # Screen components
│   ├── AuthScreen/         # Authentication screens
│   ├── HomeScreen/         # Main dashboard
│   ├── ExploreScreen/      # Discovery interface
│   ├── FavoritesScreen/    # Saved items
│   ├── ProfileScreen/      # User profile
│   └── SettingsScreen/     # App settings
├── services/           # API and data services
│   ├── api.ts             # Axios configuration
│   ├── eventsService.ts   # Events API integration
│   ├── venuesService.ts   # Venues API integration
│   └── mockData.ts        # Mock data for development
├── stores/             # State management (Zustand)
│   ├── eventsStore.ts     # Events state management
│   ├── venuesStore.ts     # Venues state management
│   └── favoritesStore.ts  # Favorites state management
├── navigation/         # Navigation configuration
│   ├── index.tsx          # Main navigator
│   ├── stack.tsx          # Stack navigators
│   └── tabs.tsx           # Tab navigator
├── types/              # TypeScript definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── i18n.ts            # Internationalization setup
│   └── validation.ts      # Form validation
├── constants/          # App constants
│   └── themes.ts          # Theme definitions
└── locales/            # Translation files
    ├── en/
    │   └── translation.json
    └── ar/
        └── translation.json
```

### Implementation Logic

#### 1. **Context-Based State Management**

The app uses React Context for global state management:

- **ThemeContext**: Manages light/dark theme switching with AsyncStorage persistence
- **LanguageContext**: Handles language switching and RTL layout support
- **AuthContext**: Complete authentication system with signup, login, logout, and credential persistence

#### 2. **Zustand State Stores**

For complex state management, the app uses Zustand stores:

- **EventsStore**: Manages events data, search, filtering, and caching
- **VenuesStore**: Handles venues data and search functionality
- **FavoritesStore**: Manages user favorites with persistence

#### 3. **Service Layer Architecture**

Clean separation of concerns with dedicated service files:

- **API Service**: Centralized axios configuration with interceptors
- **Events Service**: Ticketmaster API integration for events
- **Venues Service**: Venue data management
- **Mock Data**: Development data for testing

#### 4. **Navigation Structure**

```
App Navigator
├── Authentication Stack (if not authenticated)
│   └── AuthScreen
└── Main Tab Navigator (if authenticated)
    ├── Home Stack
    │   ├── HomeScreen
    │   └── DetailScreen
    ├── Explore Stack
    │   └── ExploreScreen
    ├── Favorites Stack
    │   └── FavoritesScreen
    └── Profile Stack
        ├── ProfileScreen
        └── SettingsScreen
```

## 🛠️ Technical Stack

- **React Native**: 0.79.5
- **Expo**: ~53.0.20 (Development platform)
- **TypeScript**: ~5.8.3 (Full type safety)
- **React Navigation**: ^7.1.17 (Navigation system)
- **Zustand**: ^5.0.7 (State management)
- **Axios**: ^1.11.0 (HTTP client)
- **i18next**: ^25.3.4 (Internationalization)
- **AsyncStorage**: 2.1.2 (Data persistence)
- **React Native Maps**: 1.20.1 (Map integration)
- **Expo Location**: ~18.1.6 (Location services)

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CityPulse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on specific platforms**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

### Development Commands

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Clear cache and restart
expo start -c
```

## 🔧 Development

### Adding New Features

#### 1. **Adding New Screens**

```typescript
// 1. Create screen component in src/screens/
// 2. Add to navigation in src/navigation/
// 3. Update translation files if needed
```

#### 2. **Adding New Languages**

```typescript
// 1. Create translation file in src/locales/{language}/translation.json
// 2. Update src/utils/i18n.ts
// 3. Add language option in settings
```

#### 3. **Adding New Themes**

```typescript
// 1. Define theme colors in src/constants/themes.ts
// 2. Update ThemeColors interface in src/types/index.ts
// 3. Use theme colors in components via useTheme hook
```

### Code Style Guidelines

- Use TypeScript for all new code
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Use theme-aware styling

## 🔌 API Integration

### External APIs

The app integrates with external APIs for real-time data:

- **Ticketmaster API**: For events and venues data
- **Location Services**: For user location and geolocation
- **Network Status**: For offline/online detection

### API Configuration

```typescript
// src/config/env.ts
export default {
  api: {
    baseUrl: process.env.API_BASE_URL,
    key: process.env.API_KEY,
  },
};
```

### Error Handling

- Network error handling with retry logic
- Offline fallback with cached data
- User-friendly error messages
- Loading states for better UX

## 📊 State Management

### Context Providers

- **ThemeContext**: Global theme state
- **LanguageContext**: Language and RTL state
- **AuthContext**: Authentication state

### Zustand Stores

- **EventsStore**: Events data and search
- **VenuesStore**: Venues data and search
- **FavoritesStore**: User favorites

### Data Flow

```
API → Service → Store → Component → UI
```

## 🌍 Internationalization

### Supported Languages

- **English**: Default language
- **Arabic**: Full RTL support

### Implementation

- Uses `i18next` for translation management
- Dynamic language switching
- RTL layout support for Arabic
- Persistent language preferences

### Adding Translations

```json
// src/locales/en/translation.json
{
  "common": {
    "welcome": "Welcome",
    "search": "Search"
  }
}
```

## 🎨 Theming System

### Theme Structure

```typescript
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}
```

### Theme Features

- Light and dark mode support
- Theme-aware components
- Persistent theme preferences
- Consistent color usage

## 🧭 Navigation Structure

### Authentication Flow

```
App Start → Check Auth → Auth Screen (if not authenticated)
```

### Main App Flow

```
Tab Navigator
├── Home (Featured content, search)
├── Explore (Discovery, maps)
├── Favorites (Saved items)
└── Profile (User settings, preferences)
```

### Navigation Features

- Bottom tab navigation
- Stack navigation for deep linking
- Screen transitions and animations
- RTL support for Arabic

## 🚀 Future Enhancements

- **Real-time Features**: Push notifications, live updates
- **Social Features**: Reviews, ratings, sharing
- **Advanced Search**: Filters, sorting, recommendations
- **Performance**: Image optimization, lazy loading
- **Analytics**: User behavior tracking
- **Testing**: Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add proper error handling
- Include loading states
- Test on both iOS and Android
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

---

**Built with ❤️ using React Native and Expo**
