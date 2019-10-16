<template>
  <div>
    <v-app-bar app color="indigo" dark>
      <router-link id="brand" to="/">
        <!-- <img id="brandLogo" src="~/assets/logo.png" /> -->
        <div id="brandLogo"></div>
      </router-link>
      <router-link id="brandName" to="/">
        <v-toolbar-title>galdr</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <!-- user: {{ user }} -->
      Hello {{ firstName }}!

      <v-spacer></v-spacer>

      <v-btn v-for="link in links" :key="link.id" text rounded :to="link.url">
        {{ link.label }}
      </v-btn>

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
  data() {
    return {
      links: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Test',
          url: '/test'
        },
        {
          label: 'Collection',
          url: '/collection'
        }
      ]
    }
  },
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

#brandName {
  color: white;
  text-decoration: none;
}

#brandLogo {
  height: 50px;
  width: 50px;
  background-image: url('../assets/logo.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0 10px 0 0;
}
</style>
