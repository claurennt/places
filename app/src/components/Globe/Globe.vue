<template>
  <div ref="globeContainer" class="globe-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import Globe from 'globe.gl'
import { createElement, placeDataMock } from '../../utils'

const globeContainer = ref<HTMLDivElement | null>(null)
let globeInstance: ReturnType<typeof Globe> | null = null
let resizeObserver: ResizeObserver | null = null
const currentRotation = ref({ lat: 0, lng: 0 })

// --- Resizes the globe to match container
const updateSize = () => {
  if (!globeContainer.value || !globeInstance) return

  const { offsetWidth, offsetHeight } = globeContainer.value

  globeInstance.width(offsetWidth).height(offsetHeight)

  // Also update camera aspect ratio (avoids globe clipping)
  const camera = globeInstance.camera()
  camera.aspect = offsetWidth / offsetHeight
  camera.updateProjectionMatrix()
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!globeInstance) return

  const rotateStep = 10 // Degrees per key press
  const transitionDuration = 100 // Smooth animation (ms)

  switch (e.key) {
    case 'ArrowLeft':
      currentRotation.value.lng += rotateStep // Rotate left
      break
    case 'ArrowRight':
      currentRotation.value.lng -= rotateStep // Rotate right
      break
    case 'ArrowUp':
      currentRotation.value.lat = Math.min(
        currentRotation.value.lat - rotateStep,
        90,
      ) // Tilt up (max 90°)
      break
    case 'ArrowDown':
      currentRotation.value.lat = Math.max(
        currentRotation.value.lat + rotateStep,
        -90,
      ) // Tilt down (min -90°)
      break
    default:
      return
  }

  // Apply rotation
  globeInstance.pointOfView(
    {
      lat: currentRotation.value.lat,
      lng: currentRotation.value.lng,
    },
    transitionDuration,
  )
}

onMounted(() => {
  if (!globeContainer.value) return

  globeInstance = Globe()(globeContainer.value)
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .htmlElementsData(placeDataMock)
    .htmlElement(createElement)

  requestAnimationFrame(updateSize)

  // Observe size changes
  resizeObserver = new ResizeObserver(updateSize)
  resizeObserver.observe(globeContainer.value)
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  if (resizeObserver && globeContainer.value) {
    resizeObserver.unobserve(globeContainer.value)
    resizeObserver.disconnect()
  }
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.globe-container {
  width: min(80vw, 80vh);
  height: min(80vw, 80vh);
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.globe-container:focus-visible {
  outline: 2px solid plum;
}

canvas {
  width: min(100vw, 100vh);
  height: min(100vw, 100vh);
}
</style>
