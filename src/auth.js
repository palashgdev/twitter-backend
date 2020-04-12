import jwt from 'jsonwebtoken'

export const createAccessToken = async ({ user, secret, expiresIn }) => {
  try {
    const { _id, name, email, handle } = user
    return await jwt.sign({ _id, name, email, handle }, secret, {
      expiresIn,
    })
  } catch (error) {
    throw error
  }
}
