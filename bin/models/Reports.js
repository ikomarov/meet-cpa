const Reports = {
  user_id: {
    type: Number,
    required: true,
    index: true
  },

  report: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: ''
  },

  from: {
    type: Number,
    required: true,
    index: true
  },

  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },

  // у обращений должны быть статусы и прочее/ возможно работа со скринами
}

export default Reports
