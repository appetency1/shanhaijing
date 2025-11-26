export class FogController {
  constructor({ initialOpacity = 1 } = {}) {
    this.opacity = initialOpacity
    this.materials = new Set()
  }

  attachMaterial(material, uniformName = 'uFogOpacity') {
    if (!material || !material.uniforms) return
    this.materials.add({ material, uniformName })
    this._apply()
  }

  setOpacity(value) {
    this.opacity = Math.max(0, Math.min(1, value))
    this._apply()
  }

  reveal(delta = 0.1) {
    this.setOpacity(this.opacity - delta)
  }

  _apply() {
    this.materials.forEach(({ material, uniformName }) => {
      if (material.uniforms[uniformName]) {
        material.uniforms[uniformName].value = this.opacity
      }
    })
  }
}
