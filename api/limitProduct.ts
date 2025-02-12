/**
 * 限购商品列表
 * @param size 分页大小
 * @param page 页数
 */
export function list(size: number = 15, page: number = 1) {
    return useAxios().get(`/api/limited-purchase/available?size=${size}&page=${page}`);
}

/**
 * 用户购买限购商品
 * @param userId 用户ID
 * @param productId 商品ID
 * @param quantity 购买数量
 */
export function purchase(userId: number, productId: number, quantity: number = 1) {
    return useAxios().post('/api/limited-purchase/purchase', { userId, productId, quantity });
}

/**
 * 添加限购商品
 * @param productId 商品ID
 * @param limitQuantity 限购数量
 * @param limitTimeframe 限购频率
 */
export function add(productId: number | string, limitQuantity: number = 1, limitTimeframe: "monthly" | "daily" = "daily") {
    return useAxios().post('/api/limited-purchase/add', { productId, limitQuantity, limitTimeframe });
}

export function update(productId: number, limitQuantity: number, limitTimeframe: "monthly" | "daily" = "daily") {
    return useAxios().put('/api/limited-purchase/update-details', { productId, limitQuantity, limitTimeframe });
}

/**限购商品 */
export type limitProductDTO = {
    productId: number;
    productName: string;
    productModel: string;
    productInfo: string;
    productPrice: number;
    productCategory: number;
    productCover: string;
    limitQuantity: number;
    endDate: string;
    inventory: number;
}