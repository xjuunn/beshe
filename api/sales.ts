/**
 * 售出商品
 * @param productId 商品ID
 * @param userId 用户ID
 * @param quantitySold 售出数量
 * @param totalRevenue 总收入
 */
export function sales(productId: number, userId: number, quantitySold: number, totalRevenue: number) {
    return useAxios().post("/api/sales", { productId, userId, totalRevenue, quantitySold })
}

/**
 * 销售最好的前十
 */
export function best10() {
    return useAxios().get(`/api/sales/top10`);
}

/**
 * 销售最差的前十
 */
export function worst10() {
    return useAxios().get("/api/sales/bottom10");
}

/**
 * 销售最好的商品
 */
export function bestProduct() {
    return useAxios().get(`/api/sales/best-selling`);
}

/**
 * 销售记录
 * @param size 分页大小
 * @param page 页码
 */
export function history(size: number = 15, page: number = 1) {
    return useAxios().get(`/api/sales/details/page?page=${page}&size=${size}`);
}

/**
 * 根据日期获取销售记录
 * @param year 年份
 * @param month 月份
 */
export function historyByDate(year: number, month: number) {
    return useAxios().get(`/api/sales/stats/month/${year}/${month}`)
}

export interface BestSale  {
    id:number;
    name:string;
    model:string;
    info:string;
    price:number;
    category:number;
    cover:string;
    inventory:number;
    createTime:string;
    updateTime:string;
    totalSold:number;
}

/**
 * 销售记录DTO
 */
export type HistoryDTO = {
    salesStats: {
        id: number;
        productId: number;
        userId: number;
        quantitySold: number;
        totalRevenue: number;
        soldTime: string;
    },
    product: {
        id: number
        name: string
        model: string
        info: string
        price: number
        category: number
        cover: string
        inventory: number
        createTime: string
        updateTime: string
    },
    user: {
        id: number
        username: string
        password: string
        email: string
        address: string
        phone: string
        avatar: string
        roleId: number
        isMember: number
        createTime: string
    }
}

/**
 * 销售信息DTO
 */
export type SalesDTO = {
    id: number;
    name: string;
    model: string;
    info: string;
    price: number;
    category: string;
    cover: string;
    inventory: number;
    createTime: string;
    updateTime: string;
}