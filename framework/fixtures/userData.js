function generateUserName() {
  return `user_${Date.now()}`
}

module.exports = { generateUserName }
