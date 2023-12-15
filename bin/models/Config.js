const Config = {
  //Имя конфигурации
  name: {
    type: String,
    default: ''
  },

  //код конфигурации
  code: {
    type: String,
    required: true,
    unique: true
  },

  value: {
    type: String,
    default: ''
  }
}

export default Config
