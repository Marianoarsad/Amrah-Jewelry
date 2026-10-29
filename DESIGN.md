# Amrah Jewelry Design System

## Brand audit before implementation
React 19, React Router 7, Vite 7, CSS Modules and React context provide the storefront. Express and Mongoose provide the existing API. No backend or storage contract changes are part of this redesign.

Preserved colors: primary #C64B50; secondary #C7464E; interactive #94161B and #B03B40; soft accent #C96868; white #FFFFFF; existing supporting surfaces #FBF9F7, #F6F1EE and #F4EFEC; text #1F1F1F, #2B2B2B, #555555 and #696B6C. Existing semantic feedback hues are retained. The original red wordmark asset (#C3444D) is unchanged. Primary red on white has 4.64:1 contrast; lighter accents are not used for small body text.

## Direction
An editorial split hero, Playfair headings, Montserrat body text, white surfaces and purposeful rose-red accents. Reference: https://www.tiffany.com/ (live desktop and 375 x 667 mobile inspection). Adapt its whitespace, image hierarchy, broad product grids and progressive disclosure; do not copy its assets, colors or product claims.

## Layout and interaction
Content width 1280px; fluid gutters 20?64px. Product grids have two columns on mobile and three from tablet upward. Buttons and major touch controls are at least 44px high. Transitions use 180?240ms with reduced-motion alternatives. Tokens live in the global stylesheet; component layouts remain in CSS Modules.

## Explicitly retained limitations
Visible copy, sample ratings, promotional text, placeholder policy/social destinations and unconnected newsletter/password recovery controls are preserved at the user?s request. Product/material claims have not been independently verified. Checkout continues to simulate success after network errors, ignores unsuccessful HTTP responses, and uses a payload different from the backend order schema. It still charges the existing shipping fee despite free-shipping copy elsewhere. Cart lines continue to merge by product ID, including different options. Offline authentication stores demo credentials locally. None of these behaviors indicates production readiness. No payment methods, account pages or policies were added.

## Verification
- `npm.cmd run build -- --configLoader runner`: passed (Vite production build).
- `node src/util/catalog.test.js` from Frontend: passed, covering duplicate categories, missing categories, unknown categories and empty catalogs.
- Frontend lint: 26 pre-existing errors remain (down from the 49-error baseline), listed by `npm.cmd run lint`; no rules were globally relaxed. The narrow loader-export comments document the established React Router lazy-route pattern.
- Live Brave desktop checks: homepage, category navigation into the catalog, three-column catalog, product detail. Responsive homepage reviewed at 768, 1024 and 1440 pixels.
- Live Brave iPhone SE emulation (375 x 667): product gallery, enlarged-image dialog and Escape dismissal, material and size selection, adding a disposable bag item, bag summary, checkout scrolling and empty-form validation, navigation drawer, sign-in and registration layouts. No account or order was created. The disposable bag item was removed afterward.
- Search was verified for matching `pearl` results and a no-match query; results are keyboard-accessible route links.
- The QA origin was http://127.0.0.1:5173. The unchanged API CORS policy allows http://localhost:5173, so these browser checks exercised the bundled catalog fallback. Live API success and signed-in authentication were not verified.
- Reduced-motion support was implemented through CSS media rules and Framer Motion configuration; live preference switching, animation timing and performance metrics were not measured. The 390px viewport was not separately inspected.
- No database changes, dependency installation, deployment or logo edits. Existing original photographs are retained alongside WebP derivatives.

## Important implementation areas
Shared tokens and baseline styles: `Frontend/src/index.css`. Header and mobile navigation: `HeaderLayout.jsx` and `Navigation.module.css`. Homepage: Hero, Categories, PopularProducts and Follow. Product browsing: Shop, ProductItem, ProductDetail and Wishlist styles. Shopping overlays: Modal, Cart, Checkout, Search and Authentication. Category derivation and its dependency-free checks: `src/util/catalog.js` and `catalog.test.js`.
