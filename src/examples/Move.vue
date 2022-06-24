<template>
  <div
    class="item absolute"
    :style="position"
    data-testid="draggable"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  ></div>
</template>

<script>
export default {
  name: 'Move',
  data() {
    return {
      isMouseDown: false,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
    }
  },
  computed: {
    position() {
      return `transform: translate(${this.top}px, ${this.left}px)`
    },
  },
  methods: {
    handleMouseDown(e) {
      e.preventDefault()
      this.isMouseDown = true
      this.x = e.clientX
      this.y = e.clientY
    },
    handleMouseMove(e) {
      if (!this.isMouseDown) {
        return
      }
      e.preventDefault()
      const deltaX = this.x - e.clientX
      const deltaY = this.y - e.clientY
      this.x = e.clientX
      this.y = e.clientY
      this.top = this.top - deltaX
      this.left = this.left - deltaY
    },
    handleMouseUp(e) {
      this.isMouseDown = false
    },
  },
}
</script>

<style scoped>
.absolute {
  position: absolute;
  margin: 0;
  top: 10px;
  left: 20px;
  width: 1000px;
  height: 1000px;
}
</style>
