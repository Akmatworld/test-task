<template>
  <div class="row header">
    <TotalCountPosts/>
    <Switcher/>
  </div>
</template>

<script>
import TotalCountPosts from './TotalCountPosts';
import Switcher from './Switcher';

export default {
  name: 'Header',
  components: {
    TotalCountPosts,
    Switcher
  }
}
</script>

<style scoped>
.header {
  margin: 10px 0 0;
}
</style>