import { defineConfig } from 'vite';
// import wasm from 'vite-plugin-wasm'; // ❌ 注释掉或删除这行，这是报错的根源
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    // wasm(), // ❌ 删除这行
    topLevelAwait() // ✅ 保留这行，OpenCascade 需要它
  ],
  // ✅ 关键配置：告诉 Vite 把 .wasm 文件当作静态资源（像图片一样），不要尝试解析它
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    exclude: ['opencascade.js'] // ✅ 排除预构建，防止 Vite 尝试打包它
  },
  server: {
    headers: {
      // 某些浏览器可能需要这些头信息来运行 WASM
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
});