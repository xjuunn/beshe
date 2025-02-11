
/**
 * 获取评论列表
 */
export function list() {
    return useAxios().get('/api/reviews');
}

/**
 * 查询用户的评论
 * @param id 用户ID
 */
export function listByUserID(id: string | number, size: number, page: number) {
    return useAxios().get(`/api/reviews/user/${id}/page?size=${size}&page=${page}`);
}

/**
 * 查询商品评论
 * @param id 商品ID
 */
export function listByProductID(id: string | number, size: number, page: number) {
    return useAxios().get(`/api/reviews/product/${id}/page?size=${size}&page=${page}`);
}

/**
 * 添加评论
 * @param review 评论
 */
export function add(review: ReviewDTO) {
    return useAxios().post('/api/reviews', review);
}

/**
 * 修改评论
 * @param review 评论- 需要携带评论ID
 */
export function update(review: ReviewDTO) {
    return useAxios().put(`/api/reviews/` + review.id, review);
}

/**
 * 删除评论
 * @param id 评论ID
 */
export function del(id: string | number) {
    return useAxios().delete('/api/reviews/' + id);
}

/**
 * 评论数据传输对象
 */
export interface ReviewDTO {
    id?: number,
    userId: number,
    productId: number,
    rating: number,
    content: string,
    createTime?: string,
}