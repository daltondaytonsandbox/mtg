<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <!-- Left Column -->
          <h1 class="text-center">Add Cards</h1>
          <v-text-field
            v-model="searchInput"
            label="Search"
            append-icon="search"
            @click:append="searchCards"
            @keyup.enter="searchCards"
          ></v-text-field>
          <div v-if="cards.length < 1 && searchAttempt">
            {{ noResultMessage }}
          </div>
          <ul v-if="cards.length > 0">
            <li v-for="card in cards" :key="card._id">
              <v-tooltip v-if="card.image_uris" bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    {{ card.name }}
                  </span>
                </template>
                <span>
                  <h1>{{ card.set_name }}</h1>
                  <br />
                  <img :src="card.image_uris.normal" :alt="card.name" />
                </span>
              </v-tooltip>
              <v-btn class="ml-4" @click="addToCollection(card._id)">Add</v-btn>
            </li>
          </ul>
        </v-col>
        <v-divider class="mx-4" vertical></v-divider>
        <v-col>
          <!-- Right Column -->
          <h1 class="text-center">{{ firstName }}'s Collection</h1>
          <h2>-{{ userName }}-</h2>
          <ul>
            <div v-for="(user, index) in users" :key="index">
              <li v-for="card in user.cardCollection" :key="card.id">
                {{ card }}
              </li>
            </div>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      cards: [],
      searchAttempt: false,
      noResultMessage: 'No Cards Found',
      searchInput: '',
      users: {}
    }
  },
  computed: mapState({
    firstName: (state) => state.firstName,
    userName: (state) => state.user
  }),
  async asyncData({ $axios, store }) {
    const users = await $axios.$get('/api/user', {
      params: {
        userName: store.state.user
      }
    })
    return { users }
  },
  async updated() {
    this.users = await this.$axios.$get('/api/user', {
      params: {
        userName: this.$store.state.user
      }
    })
  },
  methods: {
    async searchCards() {
      this.cards = await this.$axios.$get('/api/cards', {
        params: {
          searchInput: this.searchInput
        }
      })
      this.cards.sort((a, b) => (a.name > b.name ? 1 : -1))
      this.searchAttempt = true
    },
    async addToCollection(id) {
      await this.$axios.$post('/api/users', {
        params: {
          cardID: id
        }
      })
    }
  }
}
</script>

<style scoped></style>
