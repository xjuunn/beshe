export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.fullPath.includes('admin')) {
        setTimeout(() => {
            let user;
            if (import.meta.client) user = JSON.parse(localStorage.getItem('user') + '');
            if (!user) return navigateTo('/login');
            if (user.roleId != 1) return navigateTo('/noPermissions')
        }, 100);
    }
});
