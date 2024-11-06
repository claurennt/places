**This is a work in progress**

# Places

**Places** is a monorepo containing a web application and a GraphQL API server that allows users to save and interact with their favorite locations on a 3D globe.
With a user-friendly interface and an intuitive design, Places makes it easy for users to keep track of memorable places they've visited or want to explore in the future.

## 🌍 Features

- **Interactive 3D Globe:** Visualize saved places on a globe, with smooth navigation and zoom controls.

- **Add and Manage Places:** Users can save, edit, and remove places they’ve visited or plan to visit.

- **Detailed Map View:** Clicking on a saved place opens a more detailed map view of that location, providing additional insights and a closer look at the area.

- **Search and Explore:** Integrated search functionality for quick access to specific locations.

## Project Structure

This monorepo is organized into two main parts:

- **Web Application:** Built with Vue.js and Three.js, the web app provides an interactive 3D globe interface where users can save and view their favorite places. Clicking on any saved place opens a more detailed map view of the location.

- **GraphQL API Server:** A GraphQL server that manages and serves place data to the web application. The server handles all CRUD operations, making it easy to interact with saved data efficiently and flexibly.

## ⚙️ Technologies Used

The Places app is built using the following technologies:

- **Frontend**: Vue, TypeScript, globe.gl

- **Backend**: TypeScript, Express.js, GraphQL

- **Database**: MongoDB

- **Package manager**: pnpm

- **Builder**: Webpack
