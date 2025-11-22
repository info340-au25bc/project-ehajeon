# Updated Content (11/21)
## Proposal
- Added lang="en" to <html>
- Added meta viewport

## Draft 1
- Added formal header element
- Removed a tags from buttons
- Small revisions to CSS rules
- Changed login/register input ids
- Note: not sure how to handle aria-labels at the moment, so I've removed them for now :c

## Draft 2
- Mainly worked on implementing the functionalities for PartyBuilder.jsx! Please refer to this page as the 'completed feature'.
- Other minor interactions that previously existed in Draft 1 were migrated

### Important Draft 2 Notes
- Not all data has been filled out yet! Only 6 character entries currently actually 'work' (are added to the party composition with portraits and raid) for testing purposes.
- Quiz pages not added to this Draft 2 submission (refer to Quiz.jsx) for the time being. Currently in the process of adding/streamlining the questions and making sure I have a scoring system that works properly on the side!

Release Draft 2-1 (which will be after the due date) aims to complete three things: full json data, quiz pages added, and CSS rule review.

## Still Needs Work
- Conversion of DOM elements from other pages into .map() loops
- Need to improve the organization structure of Components/functions


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
