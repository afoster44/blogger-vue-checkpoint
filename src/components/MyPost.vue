<template>
  <router-link :to="{name: 'PostDetailsPage', params: {id: myPost.id}}">
    <div class="my-post col-4">
      <div class="card bg-secondary" style="width: 60vh;">
        <div class="card-body">
          <h5 class="card-title text-info">
            {{ myPost.title }}
          </h5>
          <p class="card-text text-info">
            {{ myPost.creator.email }}
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MyPost',
  props: {
    myPost: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

.card {
  margin-top: 2rem;
}
</style>
