<template>
  <div>
    <h1 class="text-center">MTG App</h1>

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
        <v-btn class="mr-4" @click="submit">submit</v-btn>
      </v-container>
    </v-form>
    {{ response }}
    <v-divider />
    <ul>
      <li v-for="user in users" :key="user.id">
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
      age: '',
      response: 'before...'
    }
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get('/api/users')
    return { users }
  },
  methods: {
    async submit() {
      // eslint-disable-next-line no-console
      console.log('response: ')
      this.response = await this.$axios.$post('/api/users', {
        name: this.name,
        age: this.age
      })
      // eslint-disable-next-line no-console
      console.log(this.response)

      this.users = await this.$axios.$get('/api/users')
    }
  }
}
</script>

<style scoped></style>
