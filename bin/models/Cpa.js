const Cpa = {
  user_id: {
    type: Number,
    unique: true,
    required: true
  },

  access: {
    type: Boolean,
    default: false
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
}

export default Cpa
