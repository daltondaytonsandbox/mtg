<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Log In</h1>
        <v-card class="mx-auto mt-5 pa-5">
          <v-form>
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
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
      const data = {
        username: this.email,
        password: this.password
      }
      await this.$axios
        .$post('/api/login', data)
        .then((response) => {
          console.log('logged in')
          const notification = {
            type: 'success',
            message: 'Logged In!'
          }
          this.$store.dispatch('notification/add', notification)
          // Window resets app, router doesn't
          // window.location.href = '/test'
          this.$router.push({
            name: 'test',
            params: 'theseAreParams??'
          })
        })
        .catch((err) => {
          console.log('error: ')
          console.log(err)
          const notification = {
            type: 'error',
            message: 'Invalid Username or Password'
          }
          this.$store.dispatch('notification/add', notification)
        })
    }
  }
}
</script>

<style scoped></style>
