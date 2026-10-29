# Repository Guidelines

## Project Structure & Module Organization

- `Frontend/` contains the React 19/Vite storefront. Routes live in `src/pages/`, reusable components in `src/components/` and `src/components/UI/`, shared state in `src/store/`, and API calls in `src/services/`.
- CSS Modules live in `Frontend/src/css/`; global styles are in `src/index.css`. Bundled images belong in `src/assets/`, static files in `public/`, and the fallback catalog in `src/data/products.js`.
- `Backend/` is an Express API with Mongoose models. Keep routing in `routes/`, request handlers in `controllers/`, schemas in `models/`, and database setup in `config/db.js`.
- `Amrah/` holds source imagery; `Amrah ERD.drawio` contains the database diagram. `Admin/` is currently empty.

## Build, Test, and Development Commands

Run commands from the indicated package directory; there is no root package script.

- In each package, `npm install` installs dependencies.
- In `Frontend/`, `npm run dev` starts Vite, `npm run build` generates `dist/`, `npm run preview` serves that build, and `npm run lint` runs ESLint.
- In `Backend/`, `npm start` runs `server.js` (default port 8000). Local CORS permits `http://localhost:5173`.
- On PowerShell systems that block npm scripts, use `npm.cmd`.

## Coding Style & Naming Conventions

Use JavaScript ES modules and functional React components. Follow nearby formatting: application files commonly use four-space indentation and semicolons; Vite/ESLint configuration uses two spaces. Use PascalCase for components, camelCase for functions, and `ComponentName.module.css` for component styles. Reuse UI components, services, and context providers. ESLint enforces React Hooks and refresh rules; no formatter is configured.

## Testing Guidelines

No automated test framework, naming convention, or coverage threshold is configured. Backend `npm test` is a failing placeholder. Run frontend lint/build checks and document failures. For UI changes, verify affected interactions in a connected browser at desktop and mobile widths; replay animations and check reduced motion. Test catalog fallback separately from live API behavior. Use disposable accounts and order data.

## Commit & Pull Request Guidelines

History uses short descriptive subjects such as `Added filtering feature by category`; no strict commit prefix convention is established. Keep commits focused. PRs should explain behavior changes, reference related issues, list checks and limitations, and include screenshots for UI changes.

## Security & Configuration

Backend configuration uses `MONGO_URI`, `JWT_SECRET`, and optional `PORT`. Keep secrets untracked; backend environment files lack a package-local ignore rule. Frontend services hardcode localhost URLs. Offline authentication stores demo credentials locally: use fake credentials only.
