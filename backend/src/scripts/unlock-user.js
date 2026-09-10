// Clears a brute-force login lock for an account — the recovery path if the
// sole admin locks themselves out.
//
//   npm run unlock -- admin@example.com
//   npm run unlock -- --all
import { connectDb, disconnectDb } from '../config/db.js'
import { User } from '../models/index.js'

const arg = process.argv[2]
if (!arg) {
  console.error('Usage: npm run unlock -- <email>   (or --all)')
  process.exit(1)
}

const clear = { $set: { failedLoginAttempts: 0 }, $unset: { lockedUntil: '', lockNotifiedAt: '' } }

async function main() {
  await connectDb()
  const filter = arg === '--all' ? {} : { email: arg.toLowerCase() }
  const result = await User.updateMany(filter, clear)
  console.log(`Unlocked ${result.modifiedCount} account(s).`)
  await disconnectDb()
}

main().catch(async (err) => {
  console.error(err)
  await disconnectDb()
  process.exit(1)
})
