<template>
  <div id="app">
    <Loading/>
    <Header/>
    <Pagination/>
    <Posts/>
    <Pagination/>
  </div>
</template>

<script>
import Posts from './components/Posts';
import Header from './components/Header';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Posts,
    Header,
    Pagination,
    Loading
  },
  computed: mapState(['users']),
  methods: {
    ...mapActions(['init', 'getAllCountPosts']),
  },
  mounted() {
    this.init();
    this.getAllCountPosts();
  }
}
</script>

<style scoped>
#app {
  width: 80%;
  margin: 0 auto;
}
</style>
