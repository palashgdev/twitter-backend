import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'No valid email address provided.'],
    },
    password: { type: String, required: true, minlength: 7, maxlength: 42 },
  },
  { timestamps: true }
)

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    handle: login,
  })

  if (!user) {
    user = await this.findOne({ email: login })
  }

  return user
}

userSchema.pre('remove', function (next) {
  this.model('Tweet').deleteMany({ userId: this._id }, next)
})

userSchema.pre('save', async function () {
  this.password = await this.generatePasswordHash()
})

userSchema.methods.generatePasswordHash = async function () {
  const saltRounds = 10
  return await bcrypt.hash(this.password, saltRounds)
}

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
