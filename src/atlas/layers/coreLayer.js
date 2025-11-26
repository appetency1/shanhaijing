import { AtlasLayer } from './AtlasLayer.js'

export class CoreLayer extends AtlasLayer {
  constructor() {
    super('core', '核心 Layer')
  }

  async load(ctx) {
    if (this.isLoaded) return
    const { THREE, scene } = ctx
    if (!THREE || !scene) return

    this.group = new THREE.Group()
    this.group.name = 'core-layer'

    const orbGeo = new THREE.SphereGeometry(0.4, 24, 24)
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.75
    })
    const orb = new THREE.Mesh(orbGeo, orbMat)
    orb.position.set(0, 0.4, 0)
    this.group.add(orb)

    const ringGeo = new THREE.RingGeometry(0.8, 1.1, 48)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    this.group.add(ring)

    scene.add(this.group)
    this.isLoaded = true
  }
}
