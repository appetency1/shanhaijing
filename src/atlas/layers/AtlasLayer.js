export class AtlasLayer {
  constructor(id, label) {
    this.id = id
    this.label = label || id
    this.group = null
    this.isLoaded = false
  }

  async load(_ctx) {
    this.isLoaded = true
  }

  show() {
    if (this.group) this.group.visible = true
  }

  hide() {
    if (this.group) this.group.visible = false
  }

  dispose() {
    if (!this.group) return
    this.group.parent?.remove(this.group)
    this.group = null
    this.isLoaded = false
  }
}
