<template>
  <div>
    <h1 class="text-center">MTG App</h1>
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
    async submit() {
      await this.$axios.$post('/api/users', {
        name: this.name,
        age: this.age
      })
      this.name = ''
      this.age = ''

      this.users = await this.$axios.$get('/api/users')
    },
    async removeUser(user) {
      await this.$axios.delete('/api/users/' + user._id)
      this.users = await this.$axios.$get('/api/users')
    }
  }
}
</script>

<style scoped></style>
