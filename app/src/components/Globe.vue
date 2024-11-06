<template>
  <div ref="globeDiv"></div>
</template>

<script lang="ts">
import Globe from 'globe.gl'
import { ref, onMounted } from 'vue'
import { createElement, placeDataMock } from '../utils/globe'

export default {
  setup() {
    const globeDiv = ref(null)

    onMounted(() => {
      const globe = Globe()

      globe(globeDiv.value)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .htmlElementsData(placeDataMock)
        .htmlElement(createElement)
    })

    return {
      globeDiv,
    }
  },
}
</script>
