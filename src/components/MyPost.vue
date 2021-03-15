<template>
  <router-link :to="{name: 'PostDetailsPage', params: {id: myPost.id}}">
    <div class="my-post col-4">
      <div class="card" style="width: 50vh;">
        <div class="card-body">
          <h5 class="card-title">
            {{ myPost.title }}
          </h5>
          <p class="card-text">
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
    myPost: Object
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
