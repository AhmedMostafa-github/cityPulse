# CityPulse - React Native App

A modern, feature-rich React Native application for discovering places and events in your city with support for light/dark mode and Arabic/English languages.

## 🚀 Features

### Core Features

- **Multi-language Support**: English and Arabic with RTL layout support
- **Theme System**: Light and dark mode with customizable color schemes
- **Offline Caching**: Cache last search results for offline access
- **Responsive Design**: Mobile-first design with modern UI components

### Authentication & User Management

- **Complete Authentication System**: Signup and login with AsyncStorage persistence
- **Credential Management**: Secure storage of user credentials
- **Session Persistence**: Users stay logged in until they sign out
- **User Preferences**: Theme and language preferences saved per user
- **Favorites System**: Personalized favorites for places and events

### Navigation & UI

- Bottom tab navigation
- Stack navigation for profile screens
- Modern, animated UI components
- Gesture support

## 🏗️ Architecture

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThemedButton.tsx
│   ├── ThemedCard.tsx
│   └── ValidatedInput.tsx
├── contexts/           # React Context providers
│   ├── ThemeContext.tsx
│   ├── LanguageContext.tsx
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useFavorites.ts
│   ├── useOfflineCache.ts
│   └── useAuthForm.ts
├── screens/            # Screen components
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ExploreScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── i18n.ts
│   └── validation.ts
├── constants/          # App constants
│   └── themes.ts
└── locales/            # Internationalization files
    ├── en/
    │   └── translation.json
    └── ar/
        └── translation.json
```

### Key Components

#### Context Providers

- **ThemeContext**: Manages light/dark theme switching with AsyncStorage persistence
- **LanguageContext**: Handles language switching and RTL layout support with AsyncStorage persistence
- **AuthContext**: Complete authentication system with signup, login, logout, and credential persistence

#### Custom Hooks

- **useAuth**: User authentication and management (now part of AuthContext)
- **useFavorites**: Favorites system for places and events
- **useOfflineCache**: Offline caching with network status monitoring
- **useAuthForm**: Form state management and validation for authentication

#### UI Components

- **ThemedButton**: Versatile button component with multiple variants
- **ThemedCard**: Card component with theme-aware styling
- **ValidatedInput**: Form input component with built-in validation, error display, and password visibility toggle

## 🛠️ Technical Stack

- **React Native**: 0.79.5
- **TypeScript**: Full type safety
- **i18next**: Internationalization
- **AsyncStorage**: Data persistence
- **React Navigation**: Navigation system
- **Expo**: Development platform

## 📱 Screens

### Authentication Screen

- **Signup & Login**: Complete user registration and authentication
- **Language Switching**: Change language directly from auth screen
- **Form Validation**: Real-time validation with error handling
- **Persistent Sessions**: Users stay logged in until logout
- **Secure Storage**: Credentials stored securely in AsyncStorage

### Home Screen

- Featured places and events
- Category browsing
- Search functionality

### Explore Screen

- Interactive map placeholder
- Search filters
- Quick actions
- Recent searches

### Favorites Screen

- Saved places and events
- Empty state handling
- Remove from favorites

### Profile Screen

- User statistics
- Settings access
- Menu navigation

### Settings Screen

- Theme switching
- Language switching
- User preferences

## 🌍 Internationalization

The app supports English and Arabic languages with:

- Complete translation files
- RTL layout support
- Dynamic language switching
- Persistent language preferences

## 🎨 Theming

Comprehensive theming system with:

- Light and dark color schemes
- Theme-aware components
- Persistent theme preferences
- Consistent color usage across the app

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 🔧 Development

### Adding New Languages

1. Create translation file in `src/locales/{language}/translation.json`
2. Update `src/utils/i18n.ts` to include the new language
3. Add language option in settings

### Adding New Themes

1. Define theme colors in `src/constants/themes.ts`
2. Update `ThemeColors` interface in `src/types/index.ts`
3. Use theme colors in components via `useTheme` hook

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add to navigation in `App.tsx`
3. Update translation files if needed

## 🚀 Future Enhancements

- Real-time location services
- Push notifications
- Social features (reviews, ratings)
- Advanced search and filtering
- Integration with external APIs
- Performance optimizations

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
