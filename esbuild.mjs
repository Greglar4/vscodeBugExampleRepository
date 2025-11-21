//@ts-nocheck
import * as esbuild from 'esbuild'

const watch = process.argv.includes('--watch')
const minify = process.argv.includes('--minify')

const success = watch ? 'Watch build succeeded' : 'Build succeeded'

function getTime() {
	const date = new Date()
	return `[${padZeroes(date.getHours())}:${padZeroes(date.getMinutes())}:${padZeroes(date.getSeconds())}}] `
}

function padZeroes(i) {
	return i.toString().padStart(2, '0')
}

const plugins = [
	{
		name: 'watch-plugin',
		setup(build) {
			build.onEnd((result) => {
				if (result.errors.length === 0) {
					console.log(getTime() + success)
				}
			})
		},
	},
]

const ctx = await esbuild.context({
	entryPoints: ['src/extension.ts'],
	outdir: 'out',
	bundle: true,
	target: 'ES2021',
	format: 'cjs',
	outExtension: {
		'.js': '.cjs',
	},
	loader: { '.ts': 'ts', '.ttf': 'dataurl' },
	external: ['vscode'],
	platform: 'node',
	sourcemap: !minify,
	minify,
	plugins,
})

const reactctx = await esbuild.context({
	entryPoints: [
		'src/custom-view-app.tsx',
		'src/file-not-found-app.tsx'
	],
	outdir: 'out',
	bundle: true,
	target: 'ES2021',
	format: 'esm',
	outExtension: {
		'.js': '.mjs',
	},
	loader: { '.ts': 'ts', '.gif': 'file', '.png': 'file' },
	external: ['vscode'],
	sourcemap: !minify,
	minify,
	plugins,
})

if (watch) {
	await ctx.watch()
	await reactctx.watch()
} else {
	await ctx.rebuild()
	await reactctx.rebuild()
	ctx.dispose()
	reactctx.dispose()
}
