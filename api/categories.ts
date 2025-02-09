
/**
 * 获取商品分类列表
 */
export function getList() {
    return useAxios().get('/api/categories')
}

/**
 * 添加商品分类
 * @param category 商品分类对象
 */
export function add(category: CategoryDTO) {
    return useAxios().post('/api/categories', { name: category.name, sort: category.sort });
}

/**
 * 更新商品分类
 * @param category 商品分类对象
 */
export function update(category: CategoryDTO) {
    return useAxios().put('/api/categories/' + category.id, {
        name: category.name,
        sort: category.sort
    })
}

/**
 * 删除商品
 * @param id 商品分类id
 */
export function del(id: string | number) {
    return useAxios().delete('/api/categories/' + id);
}

export type CategoryDTO = {
    id?: number;
    name: string;
    sort: number;
}