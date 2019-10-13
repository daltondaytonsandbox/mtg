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
  methods: {
    async submit() {
      console.log('response: ')
      this.response = await this.$axios.$post('/api/users', {
        name: this.name,
        age: this.age
      })
      console.log(this.response)
    }
  }
}
</script>

<style scoped></style>
