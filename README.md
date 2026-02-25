# Atheleos - Next.js Migration

This is a modern Next.js adoption of the Atheleos sports social network.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## Hardcoded Authentication

The application uses a simulated authentication system for demonstration.

-   **Email:** `user@example.com`
-   **Password:** `password`

## Project Structure

-   `app/`: Main application routes (App Router).
-   `components/`: Reusable UI components.
-   `context/`: React Context for state management (Auth).
-   `public/`: Static assets.

## Features Migrated

-   ✅ **Feed**: Posts, Stories, Suggestions.
-   ✅ **Interactions**: Like, Comment (UI only), Save.
-   ✅ **Profile**: Dynamic user profiles.
-   ✅ **Navigation**: Responsive Navbar and Sidebar.
-   ✅ **Design System**: Tailwind CSS with custom theme.
