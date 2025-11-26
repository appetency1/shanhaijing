// Centralized resource URLs for atlas layers.
// Replace placeholder files under src/atlas/assets/... with real art/audio/fonts when ready.

export const atlasAssets = {
  textures: {
    paper: new URL('./textures/paper-base.tga', import.meta.url).href,
    bamboo: new URL('./textures/bamboo-strip.tga', import.meta.url).href,
    inkMask: new URL('./textures/ink-mask.tga', import.meta.url).href
  },
  models: {
    mountain: new URL('./models/mountain-lowpoly.glb', import.meta.url).href,
    beast: new URL('./models/beast-lowpoly.glb', import.meta.url).href
  },
  audio: {
    brush: new URL('./audio/brush.wav', import.meta.url).href,
    sea: new URL('./audio/sea.mp3', import.meta.url).href
  },
  shaders: {
    mist: new URL('./shaders/mist.glsl', import.meta.url).href
  },
  fonts: {
    oracle: new URL('./fonts/oracle-sample.ttf', import.meta.url).href
  }
}

export const resolveAtlasAsset = (relativePath) =>
  new URL(relativePath, import.meta.url).href
