import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../../models/index.js'
import { schemas } from '../../lib/validate.js'
import { requireAuth, requireRole } from '../../middleware/auth.js'
import { ApiError } from '../../middleware/errors.js'

const router = Router()

router.use(requireAuth, requireRole('admin'))

router.get('/', async (_req, res, next) => {
  try {
    res.json(await User.find().sort({ createdAt: 1 }))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password, role } = schemas.userCreate.parse(req.body)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      role,
      passwordHash: await bcrypt.hash(password, 12),
    })
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const data = schemas.userUpdate.parse(req.body)
    const user = await User.findById(req.params.id)
    if (!user) throw new ApiError(404, 'User not found')

    // Don't let the last admin drop their own admin rights.
    if (data.role && data.role !== 'admin' && user.role === 'admin') {
      const admins = await User.countDocuments({ role: 'admin' })
      if (admins <= 1) throw new ApiError(400, 'At least one admin must remain')
    }

    if (data.name) user.name = data.name
    if (data.email) user.email = data.email.toLowerCase()
    if (data.role) user.role = data.role
    if (data.password) user.passwordHash = await bcrypt.hash(data.password, 12)
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (String(req.user.id) === req.params.id) {
      throw new ApiError(400, 'You cannot delete your own account')
    }
    const user = await User.findById(req.params.id)
    if (!user) throw new ApiError(404, 'User not found')
    if (user.role === 'admin') {
      const admins = await User.countDocuments({ role: 'admin' })
      if (admins <= 1) throw new ApiError(400, 'At least one admin must remain')
    }
    await user.deleteOne()
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

export default router
