export type DummyLoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  gender: string
  accessToken: string
  refreshToken: string
}

export type LoginPayload = {
  username: string
  password: string
}

export type RegisterPayload = {
  email: string
  username: string
  password: string
}
export type DummyRegisterResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  username: string
  image: string
  accessToken?: string
}

export type DummyErrorResponse = {
  message: string
  status: number
}
