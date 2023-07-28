import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

/* eslint-disable prettier/prettier */
import path from 'path'

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  const plugins = [vue()]

  return {
    plugins,
    optimizeDeps: {
      include: ['vue', 'vuetify', 'three'],
    },
    build: {
      sourcemap: true,
    },
    server: {
      strict: false,
      port: 8080,
      proxy: {
        '^/api': {
          target: 'http://localhost:6200',
          rewrite: (path) => path.replace(/^\/api\//, '/'),
          ws: true,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/_variables.scss";`,
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons'),
        // 'bootstrap-vue': path.resolve(__dirname, 'node_modules/bootstrap-vue'),
        highcharts: path.resolve(__dirname, 'node_modules/highcharts'),
      },
      extensions: ['.vue', '.js'],
    },
  }
})
