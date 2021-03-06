export const state = () => ({
  user: 'none',
  firstName: null
})

export const mutations = {
  SET_USER(state, user, firstName) {
    state.user = user
  },
  SET_FIRST_NAME(state, firstName) {
    state.firstName = firstName
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    try {
      if (req.session.passport.user) {
        commit('SET_USER', req.session.passport.user)
        commit('SET_FIRST_NAME', req.user.firstName)
      }
    } catch (error) {
      // Triggers when first entering site, before logging in
      // console.log('catch error')
      // console.log(error)
    }
  }
}
