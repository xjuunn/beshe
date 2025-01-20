import { Icon } from '@iconify/vue'
import { h, render } from 'vue';
let toastList: HTMLElement[] = [];
export default (content: string, options?: toastOption) => {
  let alert = document.createElement('div')
  let toast = document.createElement('div');

  // 默认参数合并
  options = Object.assign({
    type: 'success', position: ['bottom', 'right'], direction: 'horizontal', style: 'default',
    icon: '', size: 20, animate: {}
  }, options)
  
  // alert
  alert.classList.add('alert');
  alert.classList.add('alert-' + options.type);
  alert.classList.add('alert-' + options.style);
  alert.classList.add('alert-' + options.direction);
  if (options.icon) {
    let iconVnode = h(Icon, { icon: options.icon.replace('--', ':'), height: options.size, width: options.size });
    render(iconVnode, alert);
  }
  let contentElement = document.createElement('span');
  contentElement.innerText = content;
  alert.appendChild(contentElement)

  // toast
  toast.classList.add('toast');
  toast.classList.add('toast-' + options.position?.[0]);
  toast.classList.add('toast-' + options.position?.[1]);
  toastList.push(toast);
  toast.appendChild(alert);
  toast.style.transition = '.3s';
  toast.style.zIndex = '50';
  onAppendItem(toast, options.animate ?? {});


  if (options.position?.[0] == 'top') toast.style.marginTop = 15 + (toastList.length - 1) * 56 + 'px';
  else toast.style.marginBottom = 15 + (toastList.length - 1) * 56 + 'px';
  document.getElementsByTagName('body')[0].appendChild(toast);
  setTimeout(() => {
    let item = toastList.shift();
    if (item) onRemoveItem(item, options.animate ?? {});
    setTimeout(() => { item?.remove() }, 40);
    for (let i = 0; i < toastList.length; i++) {
      if (options.position?.[0] == 'top') toastList[i].style.marginTop = 15 + i * 56 + 'px';
      else toastList[i].style.marginBottom = 15 + i * 56 + 'px';
    }
  }, 3000);
}

function onAppendItem(item: HTMLElement, animate: toastAnimate) {
  item.style[animate.in ?? 'right'] = '-200px';
  setTimeout(() => {
    item.style[animate.in ?? 'right'] = '0px';
  }, 10);
}

function onRemoveItem(item: HTMLElement, animate: toastAnimate) {
  item.style[animate.out ?? 'bottom'] = '-200px';
}




type toastOption = {
  icon?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  style?: 'outline' | 'dash' | 'soft' | 'default';
  position?: ['top' | 'bottom' | 'middle', 'left' | 'right' | 'center']
  direction?: 'vertical' | 'horizontal';
  size?: number;
  animate?: toastAnimate
}

type toastAnimate = {
  in?: 'top' | 'bottom' | 'left' | 'right';
  out?: 'top' | 'bottom' | 'left' | 'right';
}