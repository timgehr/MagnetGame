import { createStore } from 'vuex'

export default createStore({
  state: {
    player: {
      name: '',
      points: 0,
      submissions: [],
      friend: '',
      gameState: '',
    },
    gameState: {
      round: 0,
      type: "poetry"
    },
    gameCode: "",
    hasCurrentData: false,
  },
  mutations: {
    setPlayerName(state, username) {
      state.player.name = username
    },
    setPlayerFriend(state, username) {
      state.player.friend = username
    },
    updatePlayerScore(state, newScore) {
      state.player.score = newScore
    },
    playerSubmissions(state, submission) {
      state.player.submissions.push(submission)
    },
    setGameCode(state, code) {
      state.gameCode = code
    },
    setGameState(state, round, type) {
      state.gameState = {
        round: round,
        type: type
      }
    },
    setLocalStorage(state) {
      localStorage.setItem('playerData', JSON.stringify(state.player));
      localStorage.setItem('gameCode', JSON.stringify(state.gameCode));
    },
    getLocalStorage(state) {
      if (state.hasCurrentData === false) {
        state.player = JSON.parse(localStorage.getItem('playerData'))
        state.gameCode = JSON.parse(localStorage.getItem('gameCode'))
        state.hasCurrentData = true;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
