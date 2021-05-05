<template>
  <div class="container-fluid bg-success">
    <div class="row">
      <div class="col-8 offset-2">
        <!-- leaving this in a form because I don't really know how to fill the space with a modal...
        I guess I could end up doing a whole heading and trying to figure out some kind of introduction. -->
        <form v-if="state.user.isAuthenticated" class="text-center">
          <div class="form-group">
            <label for="exampleInputEmail1">Blog Title</label>
            <input type="text" class="form-control" aria-describedby="text" placeholder="Blog Title" v-model="state.newBlog.title">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Blog Body</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Blog Body" v-model="state.newBlog.body">
          </div>
          <button type="button" class="btn btn-info btn-block" @click="createBlog">
            Submit
          </button>
        </form>
      </div>
    </div>
    <div class="row-flex mt-3">
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
.row-flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}
</style>
