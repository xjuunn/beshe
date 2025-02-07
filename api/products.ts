/**
 * 获取商品列表
 */
export function getProducts() {
    return useAxios().get('/api/products');
}

/**
 * 获取商品详情
 * @param id 商品id
 */
export function getProductInfo(id: number | string) {
    return useAxios().get('/api/products/' + id);
}

/**
 * 新增商品
 * @param product 商品
 */
export function addProduct(product: ProductDTO) {
    const formdata = new FormData();
    formdata.append('name', product.name);
    formdata.append('info', product.info);
    formdata.append('category', product.category + '');
    formdata.append('inventory', product.inventory + '');
    formdata.append('model', product.model);
    formdata.append('price', product.price + '');

    product.covers?.forEach((item, index) => {
        console.log("遍历：", item, index);
        formdata.append(`files`, item);
    })
    return useAxios().post('/api/products/add', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**
 * 删除商品
 * @param id 商品id
 */
export function deleteProduct(id: string | number) {
    return useAxios().delete('/api/products/delete/' + id);
}

/**
 * 搜索商品
 * @param keyword 关键字
 */
export function searchProduct(keyword: string) {
    return useAxios().get('/api/products/search?keyword=' + keyword);
}

/**
 * 更新商品信息
 * @param id 商品id
 * @param product 商品信息
 */
export function updateProduct(id: number | string, product: ProductDTO) {
    return useAxios().post('/api/products/update', {
        id, ...product
    })
}

export type ProductDTO = {
    /**商品名 */
    name: string;
    /**商品图片 */
    covers?: File[];
    /**商品信息 */
    info: string;
    /**商品分类ID */
    category: number;
    /**商品库存 */
    inventory: number;
    /**商品型号 */
    model: string;
    /**商品价格 */
    price: number;
}