const Match = {
  user1_id: {
    type: Number,
    required: true,
    index: true
  },

  user2_id: {
    type: Number,
    index: true
  },

  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },

  type: {
    type: String,
    default: ''
  }
}

export default Match
