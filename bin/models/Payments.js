const Payments = {
  paymentId: {
    type: String,
    required: true,
    index: true
  },
  user_id: {
    type: Number,
    required: true,
    index: true
  },
  amount: {
    value: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'RUB',
    },
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  type: {
    type: String,
    default: '',
  }
}

export default Payments
