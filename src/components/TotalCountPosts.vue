<template>
  <div class="col-6">
    Всего постов: {{ totalCntPosts }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Totalcountposts',
  computed: mapState(['totalCntPosts']),
}
</script>

<style scoped>

</style>