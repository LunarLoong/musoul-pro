import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Inspect from 'vite-plugin-inspect';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass',
				}),
			],
			dts: 'src/components.d.ts',
		}),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
		Inspect(),
	],
	resolve: {
		alias: {
			'~/': `${pathSrc}/`,
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 两种方式都可以
				additionalData: `@use "~/styles/element/index.scss" as *;`,
			},
		},
	},
	server: {
		// cors: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000/api/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});
