import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, minlength: 1, maxlength: 280 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isComment: { type: Boolean, default: false },
    commentedOn: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
  },
  { timestamps: true }
)

tweetSchema.pre('remove', function (next) {
  this.model('Tweet').deleteMany(
    { isComment: true, commentedOn: this._id },
    next
  )
})

const Tweet = mongoose.model('Tweet', tweetSchema)

export default Tweet
