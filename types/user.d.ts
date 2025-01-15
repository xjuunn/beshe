interface UserState {
  token: string | null
  user: any | null
  loading: boolean
}

interface UserStore {
  state: UserState
  login: (username: string, password: string) => Promise<any>
  register: (userData: any) => Promise<any>
  logout: () => void
} 