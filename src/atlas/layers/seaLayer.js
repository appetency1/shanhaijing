import { AtlasLayer } from './AtlasLayer.js'

export class SeaLayer extends AtlasLayer {
  constructor() {
    super('sea', '海经 Layer')
  }

  async load(ctx) {
    if (this.isLoaded) return
    const { THREE, scene } = ctx
    if (!THREE || !scene) return

    this.group = new THREE.Group()
    this.group.name = 'sea-layer'

    const baseGeo = new THREE.CircleGeometry(2.4, 48)
    const baseMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.35
    })
    const water = new THREE.Mesh(baseGeo, baseMat)
    water.rotation.x = -Math.PI / 2
    this.group.add(water)

    const innerGeo = new THREE.CircleGeometry(1.1, 32)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.2
    })
    const inner = new THREE.Mesh(innerGeo, innerMat)
    inner.rotation.x = -Math.PI / 2
    inner.position.y = 0.02
    this.group.add(inner)

    scene.add(this.group)
    this.isLoaded = true
  }
}
