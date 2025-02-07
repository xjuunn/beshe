
/**
 * 用户注册
 * @param username 用户名
 * @param password 密码
 * @param avatars 头像
 */
export function register(username: string, password: string, avatars: File) {
  const formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);
  formdata.append('avatars', avatars);
  return useAxios().post('/user/register', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 */
export function login(username: string, password: string) {
  return useAxios().post('/user/login', {
    username, password
  })
}

/**
 * 修改密码
 * @param username 用户名
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export function updatePassword(username: string, oldPassword: string, newPassword: string) {
  return useAxios().post('/user/changePassword', {
    username, oldPassword, newPassword
  })
}