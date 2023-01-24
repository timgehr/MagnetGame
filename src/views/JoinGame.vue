<template>
    <div class="new-game">
        <div class="word-row">
            <div class="player magnet">game</div>
            <div class="player magnet">id</div>
            <div class="player magnet">:</div>
            <input class="input player code-input magnet" style="text-transform:lowercase" maxlength="4"
                v-model="code" />
        </div>
        <div class="word-row">
            <div class="player magnet">your</div>
            <div class="player magnet">name</div>
            <div class="player magnet">:</div>
            <input class="input player name-input magnet" v-model="playerName" maxlength="15" />
        </div>
        <div class="error-message magnet" v-if="errorMessage.length > 1">{{ errorMessage }}</div>
        <div class="bottom-button">
            <div class="button-magnet" v-on:click="joinGame">Join</div>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, updateDoc, arrayUnion, collection, setDoc } from "firebase/firestore"
import db from '../firebase/init.js'
import store from '../store/index'
export default {
    data() {
        return {
            code: "",
            playerName: "",
            errorMessage: ""
        }
    },
    computed: {
        rotate(degrees) {
            return (degrees - Math.floor(Math.random() * (2 * degrees)))
        }
    },
    methods: {
        async joinGame() {
            const gameSnap = await getDoc(doc(db, this.code, "gameState"));
            if (gameSnap.exists()) {
                store.commit('setGameCode', this.code)
                const playerSnap = await getDoc(doc(db, this.code, "players", "players", this.playerName));
                if (!playerSnap.exists()) {
                    // create a new player in the db
                    setDoc(doc(db, this.code, 'players', 'players', this.playerName), {
                        name: this.playerName,
                        points: 0,
                        partner: "",
                        submission: []
                    });
                    // add player to playerNames
                    updateDoc(doc(db, this.code, 'players'), {
                        playerNames: arrayUnion(this.playerName)
                    });
                    // set player name
                    store.commit('setPlayerName', this.playerName)
                    // set localStorage
                    store.commit('setLocalStorage')
                    // re-route
                    this.$router.push({ path: '/lobby/' + this.code })

                } else if (store.state.player.name === this.playerName) {
                    // re-route
                    this.$router.push({ path: '/lobby/' + this.code })
                } else {
                    this.errorMessage = "Identity theft is a serious crime"
                }
            } else {
                this.errorMessage = "Can't find that game"
            }
        }
    }
}
</script>

<style>
.error-message {
    color: red;
    margin-top: 50px;
    margin-bottom: -75px;
}

.input.code-input {
    height: 50px;
    width: 130px;
    text-align: center;
    transform: rotate(2deg);
    font-size: 30px;
    margin: 10px 10px !important;
}

.input.name-input {
    height: 50px;
    width: 250px;
    text-align: center;
    transform: rotate(-1deg);
    font-size: 30px;
    margin: 10px 10px !important;
}

.word-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

@media screen and (max-width: 750px) {
    .input.code-input {
        font-size: 15px;
        height: 26px;
        width: 80px;
    }

    .input.name-input {
        font-size: 15px;
        height: 26px;
        width: 130px;
    }
}
</style>
