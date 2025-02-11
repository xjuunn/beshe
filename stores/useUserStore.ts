import { defineStore } from 'pinia'
import { login as login1 } from '../api/auth'
export const useUserStore = defineStore('user', () => {
  const runtimeconfig = useRuntimeConfig();
  let _isLogin = ref(false);
  let _isAdmin = ref(false);
  let _token = ref('');
  let _user: Ref<any> = ref({
    "id": -1,
    "username": "",
    "email": "",
    "address": "",
    "phone": "",
    "avatar": "",
    "roleId": 0,
  });
  let _avatar = ref('');
  const apibaseurl = runtimeconfig.public.apibaseurl;
  const isLogin = computed(() => _isLogin);
  const isAdmin = computed(() => _isAdmin);
  const token = computed(() => _token);
  const user = computed(() => _user);
  const avatar = computed(() => _avatar);
  onMounted(() => {
    if (import.meta.client) {
      let tokenStorage = localStorage.getItem('token');
      if (tokenStorage) {
        _isLogin.value = true;
        _token.value = tokenStorage;
        _avatar.value = localStorage.getItem('avatar') + '';
        _user.value = JSON.parse(localStorage.getItem('user') + '');
        if (_user.value?.roleId === 1) _isAdmin.value = true;
      }
    }
  })

  async function login(username: string, password: string) {
    let { data } = await login1(username, password);
    if (data.code == 200) {
      _isLogin.value = true;
      _user.value = data.data.user;
      _avatar.value = apibaseurl + '/uploads/user/' + data.data.user.avatar;
      if (data.data.user?.roleId == 1) _isAdmin.value = true;
      _token.value = data.data.token;
      if (import.meta.client) {
        localStorage.setItem('token', _token.value);
        localStorage.setItem('avatar', _avatar.value);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
    }
    refreshAxios();
    return data;
  }

  const logout = () => {
    _isLogin.value = false;
    _isAdmin.value = false;
    _token.value = '';
    _user.value = '';
    _avatar.value = '';

    if (import.meta.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('avatar');
      localStorage.removeItem('user');
    }
  }


  return { isLogin, isAdmin, token, user, avatar, login, logout, apibaseurl }

})
