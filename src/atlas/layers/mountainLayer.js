import { AtlasLayer } from './AtlasLayer.js'

export class MountainLayer extends AtlasLayer {
  constructor() {
    super('mountain', '山经 Layer')
  }

  async load(ctx) {
    if (this.isLoaded) return
    const { THREE, scene } = ctx
    if (!THREE || !scene) return

    this.group = new THREE.Group()
    this.group.name = 'mountain-layer'

    const coneGeo = new THREE.ConeGeometry(0.6, 1.4, 6)
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.95,
      metalness: 0.05
    })

    const positions = [
      [-1.8, 0, -1.2],
      [0, 0, 0],
      [1.6, 0, -0.4],
      [-0.6, 0, 1.1],
      [1, 0, 1.6]
    ]

    positions.forEach((pos, idx) => {
      const m = new THREE.Mesh(coneGeo, coneMat.clone())
      m.position.set(pos[0], 0, pos[2])
      m.scale.setScalar(0.8 + idx * 0.08)
      m.castShadow = false
      m.receiveShadow = false
      this.group.add(m)
    })

    scene.add(this.group)
    this.isLoaded = true
  }
}
