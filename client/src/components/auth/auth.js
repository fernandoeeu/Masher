class Auth {
  constructor() {
    this.authenticated = false
  }

  check() {
    if (localStorage.getItem('token') !== null) {
      this.authenticated = true
    } else {
      this.authenticated = false
    }
  }
  isAuth() {
    return this.check()
  }
}

export default new Auth()