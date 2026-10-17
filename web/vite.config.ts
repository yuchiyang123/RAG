import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// 瀏覽器只會連 http://localhost:5173（同源），
// 需要後端處理的路徑由 Vite 轉給 BFF，這樣 HttpOnly cookie 與 CSRF 行為就跟正式環境一致。
const bff = 'http://localhost:5200'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/bff': bff,
      '/graphql': { target: bff, ws: true },
      '/signin-oidc': bff,
      '/signout-callback-oidc': bff,
    },
  },
})