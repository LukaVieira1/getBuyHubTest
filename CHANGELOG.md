# Changelog

## [1.1.0] - 2025-01-15

### Added

- Language selector
- Language support for all pages
- Language support for services

## [1.0.0] - 2025-01-14

### Added

- Animated splash screen with WikiMovies logo
- Sound effect on splash screen
- Cast section on movie page
- Edge gradients for carousel

### Changed

- Refactored navigation system to clear search on return
- Optimized movie page data loading using Promise.all

### Technical

- Implemented EmblaCarousel for better performance
- Added audio preload for splash screen
- Optimized component loading during splash screen
- Improved type structure for cast members
- Improve code organization and readability
- Added API proxy to resolve CORS issues in production

## [0.3.0] - 2024-03-19

### Updated

- Next.js from 13.1.6 to 14.1.3
- TypeScript from 4.9.4 to 5.4.2
- @types/node from 18.11.18 to 20.11.25
- @types/react from 18.0.27 to 18.2.64
- @types/react-dom from 18.0.10 to 18.2.21

### Added

- Support for Next.js 14 features
- Latest TypeScript features and improvements
- Netflix-style carousel component with Framer Motion
- Added @heroicons/react for UI icons
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Integrated embla-carousel for improved carousel functionality
- Simplified carousel logic with better touch support

## [0.2.0] - 2025-01-09

### Added

- TypeScript support across the project
- Axios for HTTP request management
- Interceptor for TMDB API default request configuration
- Strong typing for all API interfaces
- Error handling in API calls
- Environment configuration with .env variables
- Created types/interfaces structure

### Changed

- Migration from JavaScript to TypeScript
- Replaced Chakra UI with Tailwind CSS
- Refactored API calls from fetch to Axios
- Improved date formatting with configurable options

### Removed

- Chakra UI and its dependencies
- Legacy HTTP client configurations
- Redundant API call code

### Modified Files

- `src/components/MovieCard.tsx` - Converted to TS and Tailwind
- `src/pages/_app.tsx` - Removed ChakraProvider and added TypeScript
- `src/pages/_document.tsx` - Converted to TS
- `src/pages/index.tsx` - Updated with new typings
- `src/pages/movie/[id].tsx` - Converted to TS and Tailwind
- `src/services/movie.ts` - Refactored to use Axios
- `src/utils/dateFormat.ts` - Enhanced with TypeScript
- `src/providers/api.ts` - New file for Axios configuration
- `src/types/movie.ts` - New file with TypeScript interfaces

### Dependencies

#### Added

- typescript@5.4.2
- @types/react@18.2.64
- @types/react-dom@18.2.21
- @types/node@20.11.25
- axios@1.3.2
- tailwindcss@3.3.3
- postcss@8.4.31
- autoprefixer@10.4.16

#### Removed

- @chakra-ui/react
- @emotion/react
- @emotion/styled
- framer-motion

### Configuration

- Added `tsconfig.json`
- Configured Tailwind CSS
- Added TypeScript support in Next.js
