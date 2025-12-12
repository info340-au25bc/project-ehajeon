# Updated Content (12/11)
## Complete Web App
Firebase finally implemented! Shoutout to Code Radiance on Youtube. It's the feature that was developed the least, so it's super basic and a bit premature (doesn't check if there's an email already registered specifically, just says 'Failed to register'), but it's there now. Furthermore, with regards to the final project specifications:

- Added a catch-all route in App.jsx for bad URLs
- Organized the React Components and Structure a bit better! Handling props isn't my strong suit so things will still be a bit awkward/could use optimization here and there.
- Fixed a couple of bugs (Such as Progression checkmarks leading to bad links without a char profile. They've been changed so that they can only be marked when attached to a char profile).

This launch also comes with several additions and revisions to the data json files (but not all of them). These will continue to be documented on git under their own tag (post-project).

## Post-Project Updates (12/11)



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
