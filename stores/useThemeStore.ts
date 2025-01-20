
export const useThemeStore = defineStore('theme', () => {
  let _isDark = ref(true);
  let _navBlur = ref(true);
  const isDark = computed(() => _isDark);
  const isNavBlur = computed(() => _navBlur);
  onBeforeMount(async () => {
    if (import.meta.client) {
      switch (localStorage.getItem('isDark')) {
        case 'true':
          _isDark.value = true;
          setTheme(true);
          break;
        case 'false':
          _isDark.value = false;
          setTheme(false);
          break;
        default:
          localStorage.setItem('isDark', 'true');
      }
    }
  })

  const toggleTheme = () => {
    setTheme(!_isDark.value);
  }

  const setTheme = (isDark1: boolean) => {
    _isDark.value = isDark1;
    document.getElementsByTagName('html')[0].setAttribute('data-theme', isDark1 ? 'dark' : 'light');
    localStorage.setItem('isDark', isDark1.toString());
  }

  const setNavBlur = (isNavBlur1: boolean) => {
    _navBlur.value = isNavBlur1;
  }

  const setCustomTheme = (themeVariables: Record<string, string>) => {
    Object.entries(themeVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  };


  return {
    isDark, isNavBlur, toggleTheme,
    setTheme, setNavBlur, setCustomTheme
  }
})

