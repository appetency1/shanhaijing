export const createBaseLights = (THREE, scene) => {
  if (!THREE || !scene) return []
  const ambient = new THREE.AmbientLight(0xfdf2e9, 0.65)
  const key = new THREE.DirectionalLight(0xfef3c7, 0.9)
  key.position.set(6, 10, 6)
  key.castShadow = false

  const rim = new THREE.DirectionalLight(0x7dd3fc, 0.35)
  rim.position.set(-4, 8, -6)

  scene.add(ambient)
  scene.add(key)
  scene.add(rim)

  return [ambient, key, rim]
}
