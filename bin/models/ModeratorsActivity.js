const ModeratorsActivity = {
  user_id: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    default: ''
  },

  for: {
    type: String,
    default: ''
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
}

export default ModeratorsActivity