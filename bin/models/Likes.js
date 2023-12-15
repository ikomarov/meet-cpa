const Likes = {
  user_id: {
    type: Number,
    required: true,
    index: true
  },

  liked_user_id: {
    type: Number,
    required: true,
    index: true
  },

  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },
}

export default Likes
