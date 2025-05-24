import express from "express";
import { signup, login, logout } from "../../controllers/auth.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",authMiddleware, logout); 
/* Why protect the logout route with authentication?
Security and Intent Verification:
Only the logged-in user themselves (or a valid session) should be able to log out. Without authentication, anyone (including malicious actors or bots) could hit the logout endpoint and clear tokens or cause inconsistent states.

Token Validity:
Logout usually involves clearing the authentication token (e.g., deleting the cookie). If the token is invalid or missing, there’s nothing to clear or the request might be suspicious — it’s safer to reject such requests.

Update User Status:
In your logout handler, you update the user’s isLoggedIn status in the database based on req.user._id. If you don’t authenticate, you don’t know which user to update.

Prevent Unintended Side Effects:
Imagine an attacker sends logout requests repeatedly to random users (if unauthenticated). This could cause confusion, weird behavior, or security issues.
*/


export default router;