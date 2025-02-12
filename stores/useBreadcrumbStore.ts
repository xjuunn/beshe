export const useBreadcrumbsStore = defineStore('Breadcrumbs', () => {
    let _breadcrumbs: Ref<BreadcrumbItem[]> = ref([{name: '首页', path: '/'}]);
    let breadcrumbs = computed(() => _breadcrumbs)

    function setBreadcrumbs(breads: BreadcrumbItem[]) {
        _breadcrumbs.value = breads;
    }

    return {
        breadcrumbs, setBreadcrumbs
    }
})


export type BreadcrumbItem ={
    name: string;
    path?: string;
}