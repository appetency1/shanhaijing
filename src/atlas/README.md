# Atlas Module Layout

Atlas is split into assets / core / layers / interaction / ui so art, rendering, and UX stay decoupled.

- assets/: textures (paper, bamboo, ink), low-poly models, sfx, fonts, shaders. Use `import.meta.url` helpers to resolve paths when you drop files in.
- core/: Three.js bootstrap (scene, camera, renderer, resize) via `createAtlasContext` and `resizeRenderer`.
- layers/: map layers (mountain, sea, wasteland, core). Base class `AtlasLayer` plus registry to toggle layers.
- interaction/: input + fog unlock + animation hooks with `InteractionBus` and `FogController`.
- ui/: bamboo note, tooltip, and log Vue components styled for a classic manuscript look.

Vite setup notes:
- `vite-plugin-glsl` handles shader files; `assetsInclude` adds `.tga/.mp3/.wav/.glsl`.
- Use `resolveAtlasAsset('textures/paper-base.tga')` style helpers to avoid hardcoded URLs.
