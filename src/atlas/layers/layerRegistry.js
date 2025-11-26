export class LayerRegistry {
  constructor() {
    this.layers = new Map()
    this.activeId = null
  }

  register(layer) {
    this.layers.set(layer.id, layer)
    return this
  }

  get(id) {
    return this.layers.get(id)
  }

  async showLayer(id, ctx) {
    const target = this.layers.get(id)
    if (!target) return null

    if (!target.isLoaded) {
      await target.load(ctx)
    }

    if (this.activeId && this.activeId !== id) {
      this.layers.get(this.activeId)?.hide()
    }

    target.show()
    this.activeId = id
    return target
  }

  hideLayer(id) {
    const target = this.layers.get(id)
    if (!target) return
    target.hide()
    if (this.activeId === id) this.activeId = null
  }

  disposeAll() {
    this.layers.forEach((layer) => layer.dispose())
    this.layers.clear()
    this.activeId = null
  }
}
