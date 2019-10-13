<template>
  <div>
    <!-- <h1 class="text-center">MTG App</h1> -->

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="name" label="Name" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="age" label="Age" required></v-text-field>
          </v-col>
        </v-row>
        <v-btn class="mr-4" @click.prevent="submit">submit</v-btn>
        <input @keyup.enter="submit" />
      </v-container>
    </v-form>

    <v-divider />
    <ul>
      <li v-for="user in users" :key="user.id">
        <v-btn @click="removeUser(user)">X</v-btn>
        {{ user.name }} is {{ user.age }} years old
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
