<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Sign Up</h1>
        <v-card class="mx-auto mt-5 pa-5">
          <v-form>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
            ></v-text-field>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
              </v-col>
            </v-row>

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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async submit() {
      await this.$axios.$post('/api/register', {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.email,
        email: this.email,
        password: this.password
      })
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      window.location.href = '/test'
    }
  }
}
</script>

<style scoped></style>
