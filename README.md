# property-studio

Property Studio is a Property Listings Management Dashboard for a real estate CRM made with Vue 3, TypeScript, TailwindCSS, and Pinia.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure

Below are the folders inside the src

- `assets/` – Includes global CSS styles and static assets such as logos and images.

- `components/` – Reusable Vue components used throughout the application.

- `data/` – Mock data used for development or testing purposes.

- `helpers/` – Utility functions and helper methods.

- `models/` – TypeScript interfaces and types for consistent data structures.

- `router/` – Vue Router configuration and route definitions.

- `services/` – Mock API service functions simulating backend calls.

- `stores/` – Pinia store modules for managing application state.

- `tests/` – Unit and component tests written with Vitest.

- `views/` – Top-level pages or views mapped to routes.

## Additional features

- Added form validation using vuelidate

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
