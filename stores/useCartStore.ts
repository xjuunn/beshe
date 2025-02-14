import { defineStore } from 'pinia'
import * as Cart from '../api/cart';
export const useCartStore = defineStore('cart', () => {
  let { user } = useUserStore();
  let _cartList: Ref<Cart.CartDTO[]> = ref([]);
  let _isloading: Ref<boolean> = ref(true);
  let _cartNum: Ref<number> = ref(-1);
  let cartList = computed(() => _cartList);
  let cartNum = computed(() => _cartNum);
  let isloading = computed(() => _isloading);
  onMounted(() => {
    initCart();

  })

  async function initCart() {
    _isloading.value = true;
    let { data } = await Cart.list(user.value.id)
    _cartList.value = data.data;
    _cartNum.value = data.data.length;
    _isloading.value = false;
  }

  function addCart(cart: Cart.CartDTO) {
    _cartNum.value = _cartNum.value + 1;
    return Cart.add(cart)
  }

  function delCart(id: string | number) {
    _cartNum.value = _cartNum.value - 1;
    return Cart.del(id)
  }

  function updateCart(id: string | number, quantity: number) {
    return Cart.updateQuantity(id, quantity);
  }

  async function getCartNum() {
    await initCart();
    return _cartNum.value;
  }

  return {
    cartList,
    isloading,
    cartNum,
    addCart,
    delCart,
    updateCart,
    initCart,
    getCartNum
  }

})
