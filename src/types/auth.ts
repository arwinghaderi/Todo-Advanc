export type DummyLoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  accessToken: string
}

export type DummyRegisterResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  address: {
    address: string
    city: string
    coordinates: {
      lat: number
      lng: number
    }
    postalCode: string
    state: string
  }
}

export type LoginPayload = {
  username: string
  password: string
}

export type DummyErrorResponse = {
  message: string
  status: number
}
