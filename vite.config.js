import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const loadGlsl = async () => {
  try {
    const mod = await import('vite-plugin-glsl')
    return mod.default()
  } catch (error) {
    console.warn('[vite] vite-plugin-glsl is not installed yet, shader imports will be skipped.')
    return null
  }
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const glslPlugin = await loadGlsl()

  return {
    plugins: [vue(), glslPlugin].filter(Boolean),
    assetsInclude: ['**/*.tga', '**/*.mp3', '**/*.wav', '**/*.glsl']
  }
})
