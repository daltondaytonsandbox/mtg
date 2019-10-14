<template>
  <div>
    <h1 class="text-center">Lorem</h1>

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
      <li v-for="person in people" :key="person.id">
        <v-btn @click="removePerson(person)">X</v-btn>
        - {{ person }}
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
    const people = await $axios.$get('/api/people')
    return { people }
  },
  methods: {
    async submit() {
      await this.$axios.$post('/api/people', {
        name: this.name,
        age: this.age
      })
      this.name = ''
      this.age = ''

      this.people = await this.$axios.$get('/api/people')
    },
    async removePerson(person) {
      await this.$axios.delete('/api/people/' + person._id)
      this.people = await this.$axios.$get('/api/people')
    }
  }
}
</script>

<style scoped></style>
