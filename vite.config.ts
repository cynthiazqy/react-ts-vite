import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 根据当前工作目录中的 `mode` 加载 .env 文件
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react()],

		// 路径别名配置
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				'@components': resolve(__dirname, 'src/components'),
				'@pages': resolve(__dirname, 'src/pages'),
				'@utils': resolve(__dirname, 'src/utils'),
			},
		},

		// 服务器配置
		server: {
			host: true, // 监听所有地址
			port: 3000,
			open: true, // 自动打开浏览器
			cors: true, // 允许跨域
			proxy: {
				// 代理配置
				'/api': {
					target: env.VITE_API_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},

		// 构建配置
		build: {
			target: 'es2015',
			outDir: 'dist',
			assetsDir: 'assets',
			minify: 'terser', // 混淆器
			terserOptions: {
				compress: {
					drop_console: true, // 生产环境移除 console
					drop_debugger: true, // 生产环境移除 debugger
				},
			},
			rollupOptions: {
				output: {
					// 分包配置
					manualChunks: {
						'react-vendor': ['react', 'react-dom', 'react-router-dom'],
						'antd-vendor': ['antd'],
					},
					// 用于从入口点创建的块的打包输出格式
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				},
			},
		},

		// CSS 配置
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "/src/styles/variables" as *;`,
				},
			},
		},
	};
});
