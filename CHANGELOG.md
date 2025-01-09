# Changelog

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

- typescript@4.9.4
- @types/react@18.0.27
- @types/react-dom@18.0.10
- @types/node@18.11.18
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
