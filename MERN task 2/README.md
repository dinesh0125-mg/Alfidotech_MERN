# PostSphere — React SPA (Task 2)

A full-featured **React Single-Page Application** that consumes the [JSONPlaceholder REST API](https://jsonplaceholder.typicode.com) and provides a complete UI for **Create / Read / Update / Delete** operations on posts.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI library (functional components + hooks) |
| **React Router v7** | Client-side routing / SPA navigation |
| **Axios** | HTTP client for REST API calls |
| **Vite** | Lightning-fast dev server & bundler |
| **JSONPlaceholder** | Mock REST API (posts, comments) |

---

## 📦 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## 🗂️ Project Structure

```
src/
├── api/
│   └── client.js          # Axios instance + API helper functions
├── components/
│   ├── Navbar.jsx/.css    # Sticky nav with active link highlighting
│   ├── Layout.jsx/.css    # Wraps all pages with nav + footer
│   ├── PostCard.jsx/.css  # Post card with view/edit/delete actions
│   ├── LoadingSpinner.jsx # Animated loading indicator
│   └── ErrorMessage.jsx   # Error banner with retry button
├── pages/
│   ├── Home.jsx/.css      # Landing page with hero + feature cards
│   ├── PostsList.jsx/.css # Posts grid with search + pagination
│   ├── PostDetail.jsx/.css# Single post + comments
│   ├── CreatePost.jsx     # Create-post form (POST request)
│   ├── EditPost.jsx       # Edit-post form (PUT request)
│   ├── PostForm.css       # Shared form styles
│   └── NotFound.jsx/.css  # 404 page
├── App.jsx                # React Router configuration
├── main.jsx               # React entry point
└── index.css              # Global styles + design tokens
```

---

## ✨ Features

- **Read** — Browse all 100 posts in a responsive grid with live search & pagination
- **Read (single)** — View a post's full content plus its comments
- **Create** — Submit new posts via a validated form with character counter
- **Update** — Edit any post in a pre-filled form
- **Delete** — Remove posts with a confirmation prompt
- **Loading states** — Animated spinner while API calls are in-flight
- **Error handling** — Friendly error banners with retry buttons
- **404 page** — Catches unmatched routes
- **Responsive** — Works on mobile, tablet, and desktop

---

## 🔌 API Endpoints Used

| Method | Endpoint | Action |
|---|---|---|
| `GET` | `/posts` | Fetch all posts |
| `GET` | `/posts/:id` | Fetch single post |
| `GET` | `/posts/:id/comments` | Fetch post comments |
| `POST` | `/posts` | Create new post |
| `PUT` | `/posts/:id` | Update a post |
| `DELETE` | `/posts/:id` | Delete a post |

> **Note:** JSONPlaceholder is a mock API. Create/Update/Delete return success responses but don't persist to a real database. The UI reflects changes in local state.

---

## 📸 Deliverables

- ✅ React repo with components, routing, and README
- ✅ All CRUD operations implemented
- ✅ Loading & error states on every data-fetch
- ✅ React Router with nested layout routes
- ✅ Axios API client abstraction layer
