# 🔐 Security Notes — JWT Authentication

## Token Storage Strategy

### ✅ Recommended: httpOnly Cookies (used in this project)

| Property | Value | Why |
|---|---|---|
| `httpOnly` | `true` | Cookie inaccessible to JavaScript — blocks XSS token theft |
| `secure` | `true` (production) | Cookie only sent over HTTPS |
| `sameSite` | `strict` | Prevents cross-site request forgery (CSRF) |
| `maxAge` | 7 days | Auto-expires, reducing window of token abuse |

### ❌ Avoid: localStorage / sessionStorage

Storing JWTs in `localStorage` is a common pitfall:
- **XSS Vulnerable**: Any injected script can run `localStorage.getItem('token')` and steal the token
- **No automatic expiry control** at the browser level
- **No CSRF protection** (but CSRF is less of a concern than XSS here)

---

## Common Pitfalls

### 1. Not validating JWT on every request
**Pitfall**: Trusting any token blindly.  
**Fix**: Always verify the signature with `jwt.verify(token, secret)` in middleware. Never decode-only.

### 2. Weak JWT secrets
**Pitfall**: Using short or predictable secrets like `"secret"`.  
**Fix**: Use a long, random secret (32+ characters). Store in `.env`. Never commit to Git.

```bash
# Generate a strong secret:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Missing token expiry
**Pitfall**: Tokens that never expire remain valid forever if stolen.  
**Fix**: Always set `expiresIn` when signing: `{ expiresIn: '7d' }`.

### 4. Overly broad CORS
**Pitfall**: `origin: '*'` with `credentials: true` (browsers block this anyway, but explicit allowlist is best practice).  
**Fix**: Set exact origin(s): `origin: 'http://localhost:5173'`.

### 5. Sending sensitive data in JWT payload
**Pitfall**: Encoding passwords, card numbers, or secrets in the payload.  
**Fix**: JWT payload is **base64-encoded, not encrypted** — store only non-sensitive identifiers (user ID, email, role).

### 6. Not hashing passwords
**Pitfall**: Storing plain-text or MD5-hashed passwords.  
**Fix**: Use bcrypt with a high salt round (≥ 10). This project uses **salt rounds: 12**.

---

## Auth Flow Summary

```
Client                  Server
  │                        │
  ├─ POST /auth/signup ──► │  Hash password (bcrypt)
  │                        │  Create user in MongoDB
  │                        │  Sign JWT → Set httpOnly cookie
  │◄─ { user } ───────────┤
  │                        │
  ├─ GET /user/profile ──► │  verifyToken middleware
  │  (cookie auto-sent)    │  jwt.verify(token, secret)
  │                        │  Attach req.user, call next()
  │◄─ { profile data } ───┤
  │                        │
  ├─ POST /auth/logout ──► │  res.clearCookie('token')
  │◄─ { success } ────────┤
```

---

## Frontend Protected Route Pattern

```jsx
// ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// App.jsx
<Route path="/dashboard" element={
  <ProtectedRoute><Dashboard /></ProtectedRoute>
} />
```

Unauthenticated users hitting `/dashboard` are immediately redirected to `/login`.
The `replace` prop means the redirect doesn't add to browser history.
