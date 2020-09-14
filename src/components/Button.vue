<template>
  <li @click="onclick"
    class="page-item">
    <a class="page-link my-custom-pointer" :class="{disableLink: !status}">{{ name }}</a>
    {{ action }}
    </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Button',
  props: ['status', 'name', 'action'],
  methods: {
    onclick() {
      if (this.status) {
        this.$emit('buttoclicked');
      }
    }
  }
}
</script>

<style scoped>
.disableLink {
  background-color: #ccc;
  color: #888;
  pointer-events: none;
}
.my-custom-pointer:hover {
  cursor: pointer;
}
</style>