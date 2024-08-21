Workflow:

1. On the Register page, the user creates an account by providing his name, email, and password. The user is assigned an email verification token and is redirected to a page that informs them that they need to verify their email.

2. By clicking the link in the email inbox, the user's email is verified (emailVerified=true), and the user can then log in.

3. Logging in with an email and password assigns the user a JWT token and a cookie, which grant the status of a logged-in user. The user is then directed to protected pages, with emailVerified=true and the auth-token in place.

4. The Sign Out action is performed by deleting the cookie from the user's browser.