import { LayerRegistry } from './layerRegistry.js'
import { MountainLayer } from './mountainLayer.js'
import { SeaLayer } from './seaLayer.js'
import { WastelandLayer } from './wastelandLayer.js'
import { CoreLayer } from './coreLayer.js'

export const buildLayerRegistry = () => {
  return new LayerRegistry()
    .register(new MountainLayer())
    .register(new SeaLayer())
    .register(new WastelandLayer())
    .register(new CoreLayer())
}

export { AtlasLayer } from './AtlasLayer.js'
export { LayerRegistry } from './layerRegistry.js'
