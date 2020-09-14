<template>
  <div class="col-6">
    <select class="form-control" id="exampleFormControlSelect1" 
      @change="selected" v-model="selectedSwitcher">
      <option v-for="item in switcher" :key="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Switcher',
  computed: {
    selectedSwitcher: {
      get() {
        return this.$store.state.selectedSwitcher;
      },
      set(selectedValue) {
        this.changeSelectedSwitcher(selectedValue);
      }
    },
    ...mapState(['switcher', 'page']),
  },
  methods: {
    selected(e) {
      this.returnDefaultValue();
      this.selectedSwitcher = e.target.value;
      this.updateSizePostsPerPage({selectedSwitcher: e.target.value, });
    },
    ...mapActions(['updateSizePostsPerPage']),
    ...mapMutations(['changeSelectedSwitcher', 'returnDefaultValue']),
  }
}
</script>

<style scoped>
#exampleFormControlSelect1 {
  width: 100px;
  float: right;
}
</style>