<template>
  <div class="posts">
    <Post v-for="post in posts" :key="post.id" :obj="post"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Post from './Post';

export default {
  name: 'Posts',
  components: {
    Post,
  },
  computed: mapState(['posts', 'selectedSwitcher']),
}
</script>

<style scoped>
</style>
