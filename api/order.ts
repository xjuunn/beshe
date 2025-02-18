
/**订单 */
export type Order = {
    order: OrderInfo;
    orderDetailsList: OrderDetails[]
}

/**订单信息 */
export type OrderInfo = {
    /**用户ID */
    userId: number;
    /**总价格 */
    totalPrice: number;
    /**订单状态 */
    status: OrderStatus;
    /**商品ID */
    productId: number;
}

/**订单状态 */
export enum OrderStatus {
    "待付款" = 0,
    "已付款" = 1,
    "申请退款" = 2,
    "申请退货" = 3,
    "已退货" = 4,
    "已取消" = 5,
    "已退款" = 6,
}

export let OrderStatusArr = [
    "待付款",
    "已付款",
    "申请退款",
    "申请退货",
    "已退货",
    "已取消",
    "已退款",
]


/**订单详情 */
export type OrderDetails = {
    /**商品ID */
    productId: number;
    /**商品数量 */
    quantity: number;
    /**商品单价 */
    price: number;
}

/**
 * 创建订单
 * @param order 订单
 */
export function add(order: Order) {
    return useAxios().post('/api/orders', order);
}

/**
 * 删除订单
 * @param id 订单ID
 */
export function del(id: number | string) {
    return useAxios().delete('/api/orders/' + id);
}

/**
 * 查看订单详情
 * @param id 订单id
 */
export function details(id: string | number) {
    return useAxios().get(`/api/orders/${id}/details`);
}

/**
 * 订单列表
 */
export function list() {
    return useAxios().get('/api/orders');
}

/**
 * 分页查询列表
 * @param pageSize 页容量
 * @param pageNum 页数
 */
export function listPage(pageSize: number, pageNum: number) {
    return useAxios().get(`/api/orders/details/page?page=${pageNum}&size=${pageSize}`);
}

/**
 * 根据用户ID查询用户订单
 * @param id 用户ID
 */
export function listByUserID(id: string | number) {
    return useAxios().get('/api/orders/user/' + id);
}

/**
 * 订单详情列表
 * @param id 订单ID
 */
export function listDetails(id: string | number) {
    return useAxios().get('/api/order-details/' + id);
}

/**
 * 删除订单详情
 * @param id 订单详情ID
 */
export function delDetails(id: string | number) {
    return useAxios().delete('/api/order-details/' + id);
}

/**
 * 更新订单详情
 * @param id 订单详情ID
 * @param orderId 订单ID
 * @param detailsInfo 订单详情
 */
export function updateDetails(id: string | number, orderId: string | number, detailsInfo: OrderDetails) {
    return useAxios().put('/api/order-details/' + id, { orderId, ...detailsInfo });
}

/**
 * 添加订单详情
 * @param id 订单ID
 * @param detailsInfo 订单详情
 */
export function addDetails(id: string | number, detailsInfo: OrderDetails) {
    return useAxios().post('/api/order-details', { orderId: id, ...detailsInfo });
}

export interface OrderDTO {
    order: {
        id: number;
        userId: number;
        status: number;
        totalPrice: number;
        productId: number;
        createTime: string;
    };
    products: {
        id: number;
        name: string;
        model: string;
        info: string;
        price: number;
        category: number;
        cover: string;
        inventory: number;
        createTime: string;
        updateTime: string;
    }[];
    user: {
        id: number;
        username: string;
        password: string;
        email: string;
        address: string;
        phone: string;
        avatar: string;
        roleId: number;
        isMember: number;
        createTime: string;
    };
}