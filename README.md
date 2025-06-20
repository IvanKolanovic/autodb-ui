# AutoDB - Car Research Platform

AutoDB is a modern web application built with SvelteKit for researching cars. It provides a dashboard with vehicle information, search functionality, and detailed vehicle pages.

## Features

- **Dashboard**: View vehicle statistics, recent recalls, and popular searches
- **Search**: Search for vehicles by make, model, and other criteria
- **Vehicle Details**: View comprehensive information about specific vehicles
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **SvelteKit**: Modern web framework for building fast, efficient web applications
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Zod**: TypeScript-first schema validation library
- **Shadcn-svelte**: UI component library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/autodb-ui.git
   cd autodb-ui
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/lib/components/`: UI components
- `src/lib/types/`: TypeScript type definitions
- `src/lib/api/`: API service functions
- `src/routes/`: SvelteKit routes and pages

## API Integration

The application is designed to work with a backend API for vehicle data. Currently, it uses mock data, but can be easily connected to a real API by updating the API service functions in `src/lib/api/vehicle-api.ts`.

Example API endpoint:

```
GET http://localhost:5276/api/vehicles/initial-search?query=Audi%20Q3&offset=0&max=20
```

## Building for Production

To create a production build:

```bash
pnpm build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
