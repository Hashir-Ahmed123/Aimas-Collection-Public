# Aima's Collection

Aima's Collection is a responsive fashion storefront for discovering clothing, cosmetics, and handbags. Visitors can browse product collections, add items to a cart, and complete a checkout with shipping details.

## Live Website

<!-- Replace the placeholder with the URL of your deployed site. -->

**Visit the store:** https://aimas-collection.netlify.app/

## Store Features

- Browse dedicated clothing, cosmetics, and handbag collections.
- View featured collections, brand information, and customer testimonials.
- Open product details and explore product imagery and options.
- Add products to a cart, adjust quantities, and remove items.
- Review shipping, tax, and order totals during checkout.
- Submit an order with shipping information and a selected payment method.
- Use a responsive layout designed for desktop and mobile screens.

## Important Data Note

This project does not use Firebase or another server-side database. Cart contents and completed orders are stored in the browser's local storage on the device where they were created. They are not shared between devices or browsers, and clearing browser data removes them. Checkout is a front-end demonstration; it does not process payments or transmit orders to a store backend.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Leaflet and React Leaflet

## Getting Started

### Requirements

- Node.js and npm

### Install and run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal after the server starts.

### Production build

```bash
npm run build
```

The production-ready site is generated in the `dist` directory.

### Preview the production build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production site into `dist`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Project Structure

```text
src/
  components/       Store pages, navigation, product, cart, and checkout UI
  contexts/         Shared cart and order state
  App.tsx           Application routes and top-level layout
  main.tsx          React application entry point
public/             Static assets served as-is by Vite
```

## Deployment

Build the project with `npm run build`, then publish the generated `dist` directory using a static hosting provider such as GitHub Pages, Netlify, or Vercel. Configure the host to serve `index.html` for application routes so links such as `/clothing` and `/checkout` work when opened directly. After deployment, replace the placeholder link in the **Live Website** section above with the public site URL.

## Configuration and Secrets

No Firebase configuration or Firebase credentials are required to run this version of the project. Do not add private credentials to client-side source files; browser-delivered application code is visible to site visitors.
