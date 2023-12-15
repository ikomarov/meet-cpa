import mongoose from 'mongoose'

const { Schema } = mongoose

const ProfilesSchema = new Schema({
  user_id: {
    type: Number,
    unique: true,
    required: true,
    index: true
  },
  age: {
    type: Number,
    required: true,
    index: true
  },
  username: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  find_gender: {
    type: String,
    enum: ['M', 'F', 'A'],
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  goal: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    required: true,
  },
  profilePhotos: {
    type: [String],
    default: []
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  has_premium: {
    type: Boolean,
    default: false
  },
  premium_created_up_to: {
    type: Date,
    default: 0
  },
  phone_number: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    index: true
  },
  is_active: { // заморозка профиля
    type: Boolean,
    default: true
  },
  is_invisible: {
    type: Boolean,
    default: false
  },
  superlike_count: {
    type: Number,
    default: 0
  },
  country_code: {
    type: String,
    default: ''
  },
  last_time_success_login: {
    type: Date,
    default: 0,
    index: true
  },
  hide_age: {
    type: Boolean,
    default: false
  },
  referral_id: {
    type: String,
    default: ''
  },
  bot_inactive: {
    type: Boolean,
    default: false
  },
  moderate: { // нужен только для выдачи при модерации
    type: Boolean,
    default: false
  }
})

ProfilesSchema.index({ location: '2dsphere' })

export default mongoose.model('Profiles', ProfilesSchema)