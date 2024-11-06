import type { PlaceData } from './types'

const markerSvg = `<svg viewBox="-4 0 36 36" aria-hidden="true">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`

export const placeDataMock: PlaceData[] = [
  {
    lat: 52.520008,
    lng: 13.404954,
    size: 30,
    color: 'white',
    name: 'Name',
  },
  { lng: 9.9872, lat: 53.5488, size: 30, color: 'white', name: 'Name2' },
]

export const createElement = (d: PlaceData) => {
  const el = document.createElement('div')
  el.role = 'button'
  el.tabIndex = 0
  el.ariaLabel = `${d.name}: Click to open map of the city`
  el.innerHTML = markerSvg
  el.style.color = d.color
  el.style.width = `${d.size}px`
  el.style['pointer-events' as any] = 'auto'
  el.style.cursor = 'pointer'
  el.onclick = () => console.info(d)
  return el
}
