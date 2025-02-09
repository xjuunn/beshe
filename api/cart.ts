
/**
 * 用户购物车列表
 * @param id 用户id
 */
export function list(id: number | string) {
    return useAxios().get('/api/cart?userId=' + id);
}

/**
 * 添加购物车
 * @param cart 购物车对象
 */
export function add(cart: CartDTO) {
    return useAxios().post('/api/cart', cart);
}

/**
 * 修改购物车商品数量
 * @param id 购物车ID
 * @param quantity 数量
 */
export function updateQuantity(id: string | number, quantity: number) {
    let formData = new FormData();
    formData.append('quantity', quantity + '');
    return useAxios().put('/api/cart/' + id, formData);
}

/**
 * 删除购物车
 * @param id 购物车ID
 */
export function del(id: string | number) {
    return useAxios().delete('/api/cart/' + id);
}

export type CartDTO = {
    productId: number;
    quantity: number;
    userId: number;
}