# 🔒 Security Notes — MERN JWT Authentication

## Where Tokens Are Stored

| Method | XSS Safe? | CSRF Safe? | Recommended? |
|---|---|---|---|
| `localStorage` | ❌ No | ✅ Yes | ❌ |
| `sessionStorage` | ❌ No | ✅ Yes | ❌ |
| **httpOnly Cookie** | **✅ Yes** | ⚠️ Needs SameSite | **✅ Yes** |

### Why httpOnly Cookies?

This project stores JWTs in **httpOnly cookies**, meaning:

1. **JavaScript cannot access the token** — `document.cookie` won't show it.
2. **XSS attacks can't steal the token**, even if an attacker injects script.
3. Combined with `SameSite=strict`, **CSRF attacks are also mitigated**.

```js
// How we set the cookie (server-side, auth.js)
res.cookie('token', token, {
  httpOnly: true,       // Not accessible via JS
  secure: true,         // HTTPS only (in production)
  sameSite: 'strict',   // No cross-site requests
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

---

## Common Pitfalls

### 1. Storing JWTs in `localStorage`
- Any XSS vulnerability exposes the token.
- Never do this for sensitive apps.

### 2. Not hashing passwords (or using weak hashing)
- Always use **bcrypt** (or argon2) — never `md5` or `sha256` for passwords.
- This project uses bcrypt with **12 salt rounds**.

### 3. Long-lived tokens without rotation
- JWTs should expire (this project: 7 days).
- Consider **refresh token rotation** for production apps.

### 4. Missing CORS `credentials` configuration
- Both server (`cors({ credentials: true })`) and client (`axios.withCredentials = true`) must agree, or cookies won't be sent.

### 5. Not validating inputs on the server
- Always validate and sanitize on the **server side**, even if the client does validation.
- Mongoose schema validators catch basic issues; add a library like `express-validator` for production.

### 6. Exposing sensitive data in JWT payload
- Only store the user `id` in the JWT, **never** passwords or secrets.

### 7. Using a weak JWT secret
- Use a long, random string (32+ characters).
- Keep it in `.env` and **never commit it to Git**.

---

## CORS + Cookies Checklist

- [x] Server: `cors({ origin: 'http://localhost:5173', credentials: true })`
- [x] Client: `axios.create({ withCredentials: true })`
- [x] Cookie: `httpOnly: true`, `sameSite: 'strict'`
- [x] Cookie: `secure: true` in production (HTTPS)

---

## Production Recommendations

1. Use **HTTPS** everywhere.
2. Set `secure: true` on cookies (already conditional in this project).
3. Add **rate limiting** (`express-rate-limit`) to auth endpoints.
4. Use **helmet** for HTTP security headers.
5. Implement **refresh token rotation** instead of single long-lived JWTs.
6. Store secrets in environment variables / a vault — never in source code.
