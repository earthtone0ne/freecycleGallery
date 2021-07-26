import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
        plugins: [
            preact({
                parserPlugins: ['classProperties']
            }),
        ],
    // server: {
    //     hmr: {
    //     port: 443,
    //     }
    // }
})