
/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 */
export function getUsers() {
    return useAxios().get('/user/users')
}

/**
 * 获取用户详情
 * @param username 用户名
 */
export function getUserInfo(username: string) {
    return useAxios().get('/user/user', { params: { username } })
}

/**
 * 更新用户
 * @param user 用户
 */
export function updateUser(user: UserDTO) {
    return useAxios().put('/user/update', { ...user })
}

export function deleteUsers(ids: number[]) {
    // @todo
    return useAxios().delete('/user/deleteAll', {});
}

/**
 * 删除用户
 * @param id 用户id
 */
export function deleteUser(id: number) {
    return useAxios().delete('/user/delete/' + id);
}

/**
 * 获取用户头像
 * @param filename 文件名
 */
export function getUserCover(filename: string) {
    return useUserStore().apibaseurl + '/uploads/user/' + filename;
}

/**
 * 更新用户头像
 * @param id   用户id
 * @param file 用户头像文件
 */
export function updateAvatar(id: string | number, file: File) {
    let fromData = new FormData();
    fromData.append('file', file);
    return useAxios().post(`/user/${id}/uploadAvatar`, fromData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}


export function getUsers2(value: userSearch = {}) {
    if (value.pageNum == undefined) value.pageNum = 1;
    if (value.pageSize == undefined) value.pageSize = 15;
    return useAxios().get('/user/page', {
        params: value
    })

}

export type userSearch = {
    pageNum?: number;
    pageSize?: number;
    username?: string;
    phone?: string;
    email?: string;
    roleId?: number | string;
}

export type UserDTO = {
    id?: number;
    username?: string;
    password?: string;
    roleId?: number;
    address?: string;
    avatar?: string;
    createTime?: string;
    email?: string;
    phone?: string;
}