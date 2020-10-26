<template>
  <div class="overlay">
    payment waiting...
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.overlay {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, .95);
  font-size: 2.5rem;
  line-height: 5;
  color: #fff;
}
</style>
