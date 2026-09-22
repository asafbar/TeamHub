function toUserResponse(user) {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        theme: user.theme
    }
}

module.exports = {
    toUserResponse
}