<template>
  <div class="loading" :class="{show: isLoading}">
    <span>Загрузка...</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Loading',
  computed: mapState(['isLoading']),
}
</script>

<style scoped>
.loading {
  position: fixed;
  background-color: #888;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
  height: 100%;
  width: 100%;
  z-index: 900;
  opacity: .7;
  top: 0;
  left: 0;
  display: none;
}
.show {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>