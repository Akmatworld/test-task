<template>
  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <Button :status="isActivePrev" name="Предыдущая" @buttoclicked="getPrevPagePosts"/>
        <li class="page-item"><span class="page-link custom-hover-background">{{ page }}</span></li>
        <Button :status="isActiveNext" name="Следуящая" @buttoclicked="getNextPagePosts"/>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Button from './Button';

export default {
  name: 'Pagination',
  components: {
    Button,
  },
  computed: {
    ...mapState(['page', 'isActivePrev', 'isActiveNext'])
  },
  methods: {
    getNextPagePosts() {
      this.getNextPage();
    },
    getPrevPagePosts() {
      this.getPrevPage();
    },
    ...mapActions(['getNextPage', 'getPrevPage']),
    ...mapMutations(['incrementPage', 'decrementPage'])
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
}
.custom-hover-background:hover {
  background-color: #fff;
}
.disableLink {
  background-color: #ccc !important;
  color: #888;
}
.disableLink:hover {
  color: #888;
}
</style>