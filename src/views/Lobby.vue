<template>
    <div class="new-game" v-if="codeIsValid">
        <div class="gamecode-group">
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }"
                class="player magnet">
                game
            </div>
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }"
                class="player magnet">
                code
            </div>
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }"
                class="player magnet">
                :
            </div>
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }"
                style="text-transform:lowercase" class="player magnet">
                {{ code }}
            </div>
        </div>
        <div class="players-list">
            <div class="grid-item" v-for="player in players" :key="player">
                <div :style="{ 'transform': 'rotate(' + (10 - Math.floor(Math.random() * 20)) + 'deg)' }"
                    class="player magnet">
                    {{ player }}</div>
            </div>
        </div>
        <img href="../assets/redmagnet.png" />
        <div class="bottom-button">
            <div class="button-magnet">Ready</div>
        </div>
    </div>
    <div v-if="!codeIsValid">
        <div class="player magnet">
            invalid</div>
        <div class="player magnet">
            room</div>
        <div class="player magnet">
            I.D.</div>
    </div>
</template>

<script>
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import db from '../firebase/init.js'
export default {
    data() {
        return {
            players: [],
            code: this.$route.params.id,
            codeIsValid: true,
        }
    },
    methods: {
        async checkGameCode() {
            const gameSnap = await getDoc(doc(db, this.code, "gameState"));
            if (gameSnap.exists()) {
                this.codeIsValid = true;
            } else {
                this.codeIsValid = false;
            }
        },
        getPlayers() {
            const unsub = onSnapshot(doc(db, this.code, "players"), (doc) => {
                this.players = doc.data().playerNames
            });
        },
        getStart() {
            const unsub = onSnapshot(doc(db, this.code, "gameState"), (doc) => {
                if (doc.data().started) {
                    this.$router.push({ path: '/play/' + this.code })
                }
            });
        }
    },
    created() {
        this.checkGameCode()
        this.getPlayers()
        this.getStart()
    },
    computed: {
        rotate(degrees) {
            return (degrees - Math.floor(Math.random() * (2 * degrees)))
        }
    }
}
</script>

<style>
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
