export const createRaycaster = (THREE, camera) => {
  if (!THREE || !camera) return null
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const updatePointer = (event, rect) => {
    const bounds = rect || event.currentTarget?.getBoundingClientRect()
    const x = event.clientX - (bounds?.left || 0)
    const y = event.clientY - (bounds?.top || 0)
    pointer.x = (x / (bounds?.width || window.innerWidth)) * 2 - 1
    pointer.y = -(y / (bounds?.height || window.innerHeight)) * 2 + 1
  }

  const pick = (objects) => {
    raycaster.setFromCamera(pointer, camera)
    return raycaster.intersectObjects(objects, true)
  }

  return { raycaster, pointer, updatePointer, pick }
}
