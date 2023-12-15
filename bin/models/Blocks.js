const Blocks = {
  user_id: {
    type: Number,
    unique: true,
    required: true,
    index: true
  },

  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },
}

export default Blocks