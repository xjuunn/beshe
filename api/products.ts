/**
 * 获取商品列表
 */
export function getProducts() {
    return useAxios().get('/api/products');
}

/**
 * 分页模糊搜索商品列表
 * @param searchvalue 搜索参数
 */
export function getProducts2(searchvalue: SearchProduct) {
    if (searchvalue.pageNum == undefined) searchvalue.pageNum = 1;
    if (searchvalue.pageSize == undefined) searchvalue.pageSize = 15;
    return useAxios().get('/api/products/page', {
        params: searchvalue
    })
}

/** 商品搜索参数 */
export type SearchProduct = {
    pageNum: number;
    pageSize: number;
    name?: string;
}

export type ProdoctDTO2 = {
    id: string;
    name: string;
    model: string;
    info: string;
    price: string;
    category: string;
    cover: string;
    inventory: string;
    createTime: string;
    updateTime: string;
}

/**
 * 获取商品图片
 * @param filename 文件名
 */
export function getProductCover(filename: string) {
    return useUserStore().apibaseurl + '/uploads/products/' + filename.split(',')[0];
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
    formdata.append('name', product.name + '');
    formdata.append('info', product.info + '');
    formdata.append('category', product.category + '');
    formdata.append('inventory', product.inventory + '');
    formdata.append('model', product.model + '');
    formdata.append('price', product.price + '');

    product.cover?.forEach((item, index) => {
        console.log("遍历：", item, index);
        formdata.append(`files`, item);
    })
    return useAxios().post('/api/products/add', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**
 * 新增商品图片
 * @param id 商品id
 * @param file 图片文件
 */
export function addImage(id: number | string, file: File) {
    const formdata = new FormData();
    formdata.append('files', file);
    return useAxios().post(`/api/products/${id}/addImages`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

/**
 * 删除商品图片
 * @param id 商品Id
 * @param filename 文件名
 */
export function deleteImage(id: number | string, filename: string) {
    return useAxios().delete(`/api/products/${id}/deleteImages`, {
        params: {
            fileNames: filename
        }
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
    return useAxios().put('/api/products/update', {
        id, ...product
    })
}

export type ProductDTO = {
    /**商品名 */
    name?: string;
    /**商品图片 */
    cover?: File[];
    /**商品信息 */
    info?: string;
    /**商品分类ID */
    category?: number;
    /**商品库存 */
    inventory?: number;
    /**商品型号 */
    model?: string;
    /**商品价格 */
    price?: number;
}