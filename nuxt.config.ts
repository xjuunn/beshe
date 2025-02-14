import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  ssr: true,
  imports: {
    dirs: []
  },
  routeRules: {
    '/': { prerender: true }
  },
  devServer: { host: process.env.TAURI_DEV_HOST || 'localhost' },
  vite: {
    clearScreen: false,
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      strictPort: true,
      proxy: {
        "/serverapi": {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/serverapi/, '')
        }
      }
    },
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
    plugins: [
      tailwindcss(),
      Components({
        resolvers: [
          IconsResolver({
            prefix: 'icon',
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
  },
  css: ["~/assets/app.css"],
  compatibilityDate: '2024-11-17',
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/device',
    '@hypernym/nuxt-anime',
    '@nuxt/icon',
    'unplugin-icons/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-echarts',
  ],
  runtimeConfig: {
    public: {
      apibaseurl:process.env.API_BASE_URL
    }
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    head: {
      script: [
        {
          children: `
            (function() {
              var theme = localStorage.getItem('isDark');
              if (theme === 'false') {
                document.documentElement.setAttribute('data-theme', 'light');
              } else {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            })()
          `
        }
      ],
    }
  },
  echarts: {
    ssr: true,
    renderer: ['svg', 'canvas'],
    charts: ['BarChart', 'MapChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TooltipComponent',
      'ToolboxComponent',
      'GeoComponent',
      'VisualMapComponent',
    ],
  },
  build: { transpile: ['echarts-liquidfill'] }
});