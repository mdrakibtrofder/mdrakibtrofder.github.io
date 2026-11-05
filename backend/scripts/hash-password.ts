import * as bcrypt from "bcryptjs";

// Usage: npm run hash-password -- "my new password"
// Put the printed value in ADMIN_PASSWORD_HASH (in backend/.env and on Render).
const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Give a password of at least 12 characters: npm run hash-password -- "your password"');
  process.exit(1);
}
console.log(bcrypt.hashSync(password, 12));
