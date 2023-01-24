<template>
  <div class="new-game">
    <div class="gamecode-group">
      <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="player magnet">
        game
      </div>
      <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="player magnet">
        id
      </div>
      <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="player magnet">
        :
      </div>
      <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }"
        style="text-transform:lowercase" class="gamecode magnet">
        {{ code }}
      </div>
    </div>
    <div class="players-list">
      <div class="grid-item" v-for="player in players" :key="player">
        <div :style="{ 'transform': 'rotate(' + (10 - Math.floor(Math.random() * 20)) + 'deg)' }" class="player magnet">
          {{ player }}</div>
      </div>
    </div>
    <div class="error-message magnet" v-if="errorMessage.length > 1">{{ errorMessage }}</div>
    <div class="bottom-button" v-on:click="startGame">
      <div class="button-magnet">Start</div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, onSnapshot, arrayUnion, updateDoc, setDoc } from "firebase/firestore"
import db from '../firebase/init.js'
export default {
  data() {
    return {
      players: [],
      code: '',
      gameType: "poetry",
      errorMessage: ""
    }
  },
  methods: {
    newGame() {
      setDoc(doc(db, this.code, "gameState"), {
        round: 1,
        started: false,
        type: "poetry"
      })
      setDoc(doc(db, this.code, "players"), {
        playerNames: [],
      })
      setDoc(doc(db, this.code, "poems"), {
        poemIds: [],
      })
      updateDoc(doc(db, "oldgames", "oldgames"), {
        gamecodes: arrayUnion(this.code)
      })
    },
    async checkGameCode() {
      const alphabet = "abcdefghijklmnopqrstuvwxyz"
      this.code = alphabet[Math.floor(Math.random() * 26)].concat(alphabet[Math.floor(Math.random() * 26)]).concat(alphabet[Math.floor(Math.random() * 26)]).concat(alphabet[Math.floor(Math.random() * 26)])
      const gameSnap = await getDoc(doc(db, this.code, "gameState"))
      if (gameSnap.exists()) {
        this.code = alphabet[Math.floor(Math.random() * 26)].concat(alphabet[Math.floor(Math.random() * 26)]).concat(alphabet[Math.floor(Math.random() * 26)]).concat(alphabet[Math.floor(Math.random() * 26)])
      } else {
        this.newGame()
      }
    },
    getPlayers() {
      const unsub = onSnapshot(doc(db, this.code, "players"), (doc) => {
        this.players = doc.data().playerNames
      });
    },
    async startGame() {
      const playersSnap = await getDoc(doc(db, this.code, "players"))
      if (playersSnap.exists()) {
        if (playersSnap.data().playerNames.length > 1) {
          const dbPlayers = playersSnap.data().playerNames
          dbPlayers.map(player => {
            var friendNumber = Math.floor(Math.random() * dbPlayers.length)
            while (dbPlayers[friendNumber] === player) {
              friendNumber = Math.floor(Math.random() * dbPlayers.length)
            }
            updateDoc(doc(db, this.code, "players", "players", player), {
              "friend": dbPlayers[friendNumber]
            })
          })
          updateDoc(doc(db, this.code, "gameState"), {
            "started": true,
            "round": 1,
            "type": this.gameType
          })
          this.$router.push({ path: '/host/' + this.code })
        } else {
          this.errorMessage = "Stop playing with yourself"
        }
      }
    }
  },
  created() {
    this.checkGameCode()
    this.getPlayers()
  },
  computed: {
    rotate(degrees) {
      return (degrees - Math.floor(Math.random() * (2 * degrees)))
    }
  }
}
</script>

<style>
.new-game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.players-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-button {
  height: 20vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0px;
}

.button-magnet {
  font-size: 35px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  font-family: sans-serif;
  background-image: url('../assets/redmagnet1.png');
  background-size: cover;
  height: 204px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transform: rotate(-4deg);
}

.player {
  margin: 10px 5px;
  font-size: 30px;
}

.input {
  height: 50px;
  width: 300px;
  resize: none;
  outline: none;
  border: none;
  cursor: text;
  box-sizing: border-box;
  text-align: center;
  font-size: 30px;
}

.gamecode {
  font-size: 30px;
  margin-left: 20px;
}

.gamecode-group {
  position: fixed;
  top: 8vh;
  display: flex;
}

@media screen and (max-width: 750px) {
  .player {
    font-size: 15px;
  }

  .players-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .button {
    font-size: 25px;
  }

  .button-magnet {
    font-size: 20px;
    height: 102px;
    width: 100px;
  }
}
</style>
