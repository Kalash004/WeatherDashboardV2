class Session {
    constructor(username, expiresAt) {
        this.expires = expiresAt
        this.username = username
        this.currentChatId = null
    }

    isExpired() {
        this.expires < (new Date())
    }
}