<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sign Up</h1>
        <v-card class="mx-auto mt-5 pa-5">
          <v-form>
            <v-text-field v-model="username" label="Username"></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>

            <v-btn type="submit" color="primary" @click.prevent="submit"
              >Submit</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      await this.$axios.$post('/api/register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      this.username = ''
      this.email = ''
      this.password = ''
      window.location.href = '/test'
    }
  }
}
</script>

<style scoped></style>
