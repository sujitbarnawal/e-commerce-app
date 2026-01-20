export default defineEventHandler((event) => {
  setCookie(event, 'admin_token', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return {
    success: true,
    message: 'Logged out successfully',
  }
})
