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

  code: {
    type: String,
    unique: true,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
}

export default Cpa
