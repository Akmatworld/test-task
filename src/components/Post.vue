<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ obj.title }}</h5>
      <p class="card-text">{{ obj.body }}</p>
      <p class="card-text"><small class="text-muted">Имя пользователя: {{ obj.username }}</small></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['obj']
}
</script>

<style scoped>

</style>