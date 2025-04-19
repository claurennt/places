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
})

onBeforeUnmount(() => {
  if (resizeObserver && globeContainer.value) {
    resizeObserver.unobserve(globeContainer.value)
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.globe-container {
  width: min(100vw, 100vh);
  height: min(100vw, 100vh);
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
