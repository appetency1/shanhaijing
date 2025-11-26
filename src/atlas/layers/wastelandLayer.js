import { AtlasLayer } from './AtlasLayer.js'

export class WastelandLayer extends AtlasLayer {
  constructor() {
    super('wasteland', '荒经 Layer')
  }

  async load(ctx) {
    if (this.isLoaded) return
    const { THREE, scene } = ctx
    if (!THREE || !scene) return

    this.group = new THREE.Group()
    this.group.name = 'wasteland-layer'

    const planeGeo = new THREE.PlaneGeometry(4.4, 3.2, 1, 1)
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xfca5a5,
      transparent: true,
      opacity: 0.15
    })
    const plate = new THREE.Mesh(planeGeo, planeMat)
    plate.rotation.x = -Math.PI / 2
    this.group.add(plate)

    scene.add(this.group)
    this.isLoaded = true
  }
}
