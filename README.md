# codr.io

A modern personal website built with [Astro](https://astro.build/), TypeScript, and comprehensive testing.

## Features

- ⚡️ Fast static site generation with Astro
- 🧪 Unit tests with [Vitest](https://vitest.dev/)
- 🕹️ End-to-end tests with [Playwright](https://playwright.dev/)
- 💡 Accessible, responsive, and dark mode support
- 🛠️ Easy configuration for feature flags

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```sh
npm install
```

### Development

Start the local development server:

```sh
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) in your browser.

### Building for Production

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

### Testing

- **Unit tests:**  
  ```sh
  npm test
  ```
- **Watch mode:**  
  ```sh
  npm run test:watch
  ```
- **Test coverage:**  
  ```sh
  npm run test:coverage
  ```
- **End-to-end tests:**  
  ```sh
  npm run test:e2e
  ```

## Project Structure

```
src/
  assets/         # Static assets (images, SVGs)
  components/     # Astro & TypeScript components
  config/         # Feature flags and config
  layouts/        # Layout components
  pages/          # Astro pages
public/           # Static public files
e2e/              # Playwright E2E tests
.astro/           # Astro-generated files (gitignored)
```

## Deployment

This project is configured to deploy automatically to GitHub Pages via [GitHub Actions](.github/workflows/deploy.yml).