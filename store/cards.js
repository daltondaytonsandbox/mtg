import CardService from '@/services/CardService.js'

export const state = () => ({
  cards: [],
  card: {}
})
export const mutations = {
  SET_CARDS(state, cards) {
    state.cards = cards
  },
  SET_CARD(state, card) {
    state.card = card
  }
}
export const actions = {
  fetchCards({ commit }) {
    return CardService.getCards().then((response) => {
      commit('SET_CARDS', response.data)
    })
  },
  fetchCard({ commit }, id) {
    return CardService.getCard(id).then((response) => {
      commit('SET_CARD', response.data)
    })
  }
}
