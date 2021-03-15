<template>
  <div class="container">
    <form v-if="state.user.isAuthenticated">
      <div class="form-group">
        <label for="exampleInputEmail1">Blog Title</label>
        <input type="text" class="form-control" aria-describedby="text" placeholder="Blog Title" v-model="state.newBlog.title">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Body</label>
        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Body" v-model="state.newBlog.body">
      </div>
      <button type="button" class="btn btn-primary" @click="createBlog">
        Submit
      </button>
    </form>
    <div class="row">
      <Post v-for="post in state.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      newBlog: {},
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      postsService.getPosts()
    })
    return {
      state,
      async createBlog() {
        await postsService.createBlog(state.newBlog)
        state.newBlog = {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
