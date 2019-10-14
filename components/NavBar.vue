<template>
  <div>
    <v-app-bar app color="indigo" dark>
      <router-link id="brand" to="/">
        <img id="brandLogo" src="~/assets/logo.png" />
      </router-link>

      <v-toolbar-title>galdr</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- user: {{ user }} -->
      Hello {{ firstName }}!

      <v-spacer></v-spacer>

      <v-btn text rounded :to="'/'">Home</v-btn>
      <v-btn text rounded :to="'/test'">Test</v-btn>

      <v-divider
        v-if="firstName == 'No one'"
        class="mx-4"
        inset
        vertical
      ></v-divider>

      <v-btn v-if="firstName == 'No one'" text rounded :to="'/login'">
        Log In
      </v-btn>
      <v-btn v-if="firstName == 'No one'" text rounded :to="'/register'">
        Register
      </v-btn>

      <v-divider
        v-if="firstName != 'No one'"
        class="mx-4"
        inset
        vertical
      ></v-divider>

      <v-btn v-if="firstName != 'No one'" text rounded @click="logout">
        Log out
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  computed: mapState({
    // user: (state) => state.user,
    firstName: (state) => state.firstName
  }),
  async fetch({ store, req }) {
    await console.log(req.user)
  },
  methods: {
    async logout() {
      await this.$axios.$get('/api/logout', {})

      window.location.href = '/'
    }
  }
}
</script>

<style scoped>
#brand {
  cursor: pointer;
}

#brandLogo {
  height: 55px;
  margin: 5px 10px 0 0;
}
</style>
