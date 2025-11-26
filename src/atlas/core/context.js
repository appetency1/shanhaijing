let threeModule

const loadThree = async () => {
  if (threeModule) return threeModule
  try {
    threeModule = await import('three')
    return threeModule
  } catch (error) {
    console.warn('[atlas] Three.js is not installed yet. Run `npm i three` to enable 3D rendering.')
    throw error
  }
}

export const createAtlasContext = async (canvas, { fov = 50, near = 0.1, far = 100, initialPosition = [0, 2.2, 6] } = {}) => {
  const THREE = await loadThree()
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(fov, 1, near, far)
  camera.position.set(...initialPosition)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  })
  renderer.setPixelRatio(window.devicePixelRatio || 1)
  if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) {
    renderer.outputColorSpace = THREE.SRGBColorSpace
  } else if (THREE.sRGBEncoding) {
    renderer.outputEncoding = THREE.sRGBEncoding
  }
  renderer.shadowMap.enabled = false

  const clock = new THREE.Clock()

  const resize = (width, height) => {
    if (!width || !height) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }

  const cleanup = () => {
    renderer.dispose()
    scene.clear()
  }

  return { THREE, scene, camera, renderer, clock, resize, cleanup }
}

export const resizeRenderer = (renderer, camera, container) => {
  if (!renderer || !camera || !container) return
  const { clientWidth, clientHeight } = container
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight, false)
}
