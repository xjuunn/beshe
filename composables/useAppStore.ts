import type User from "types/User";

export const useAppStore = defineStore('App', () => {
  const appName = "校园百货";
  const _user: Ref<User> = ref({
    username: '',
    role: '',
    email: '',
    avatar: ''
  })
  const user = computed(() => _user)

  function login(u: User): boolean {
    _user.value = u;
    return true;
  }

  return {
    appName,
    user,
    login
  }
})