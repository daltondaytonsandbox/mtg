<template>
  <div>
    <!-- <h1 class="text-center">MTG App</h1> -->

    <ul>
      <li v-for="user in users" :key="user.id">
        <v-btn @click="removeUser(user)">X</v-btn>
        - {{ user }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      age: ''
    }
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get('/api/users')
    return { users }
  },
  methods: {
    async removeUser(user) {
      await this.$axios.delete('/api/users/' + user._id)
      this.users = await this.$axios.$get('/api/users')
    }
  }
}
</script>

<style scoped></style>
