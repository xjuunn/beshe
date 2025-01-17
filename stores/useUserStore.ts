import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let _isLogin = ref(false);
  let _isAdmin = ref(false);
  let _token = ref('');

  const isLogin = computed(() => _isLogin);
  const isAdmin = computed(() => _isAdmin);
  const token = computed(() => _token);

  onMounted(() => {
    if (import.meta.client) {
      let tokenStorage = localStorage.getItem('token');
      if (tokenStorage) {
        _isLogin.value = true;
        _isAdmin.value = true;
        _token.value = tokenStorage;
      }
    }
  })

  const login = () => {
    _isLogin.value = true;
    _isAdmin.value = true;
    _token.value = '123';
    if (import.meta.client) {
      localStorage.setItem('token', _token.value);
    }
  }
  const logout = () => {
    _isLogin.value = false;
    _isAdmin.value = false;
    _token.value = '';
    if (import.meta.client) {
      localStorage.removeItem('token');
    }
  }


  return { isLogin, isAdmin, token, login, logout }

})
