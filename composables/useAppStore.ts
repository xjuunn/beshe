import type User from "types/User";

export const useAppStore = defineStore('App', () => {
  const appName = "校园百货";
  const _user: Ref<User> = ref({
    username: '',
    role: '',
    email: '',
    avatar: ''
  })
  const _token = ref('');
  const user = computed(() => _user)
  const token = computed(() => _token)
  function login(u: User): boolean {
    _user.value = u;
    return true;
  }
  function setToken(t: string) {
    _token.value = t;
  }

  return {
    appName,
    user,
    login,
    token, setToken
  }
})