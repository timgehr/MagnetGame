<template>
    <div class="make-sentence">
        <draggable class="tile-list" v-model="unusedTiles" group="tiles" @start="drag = true" @end="drag = false"
            item-key="">
            <template #item="{ element }">
                <div :style="{ 'transform': 'rotate(' + (6 - Math.floor(Math.random() * 12)) + 'deg)' }"
                    class="unused word magnet">{{ element }}</div>
            </template>
        </draggable>
        <div class="tile-list-shadow"></div>

        <div v-if="whichSubmission === 2" class="half sentence">
            <div v-for="tile in friendsTiles" :key="tile"
                :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="word magnet">
                {{ tile }}</div>
        </div>

        <div v-if="whichSubmission === 2 && friendsTiles.length === 0" class="half sentence">
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="word magnet">
                .</div>
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="word magnet">
                .</div>
            <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }" class="word magnet">
                .</div>
        </div>

        <draggable class="sentence" :class="whichSubmission === 2 ? 'half' : ''" v-model="usedTiles" group="tiles"
            @start="drag = true" @end="drag = false" item-key="">
            <template #item="{ element }">
                <div :style="{ 'transform': 'rotate(' + (4 - Math.floor(Math.random() * 8)) + 'deg)' }"
                    class="word magnet">{{ element }}</div>
            </template>
        </draggable>

        <div class="bottom-button" v-on:click="submit">
            <div class="button-magnet">submit</div>
            <div class="player magnet current-name">{{ this.$store.state.player.name }}</div>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, updateDoc, arrayUnion, setDoc, onSnapshot } from "firebase/firestore"
import db from '../firebase/init.js'
import store from '../store/index'
import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    },
    data() {
        return {
            drag: false,
            poemId: 0,
            whichSubmission: 1,
            usedTiles: [],
            friendsTiles: [],
            unusedTiles: ["you", "can", "call", "me", "daddy", ", ", "but", "please", "don't", "here", "are", "some", "more", "words", "for", "you", "to", "use",
                ".", "I", "can", "use", "tranquil", "positive", "but", "I", "could", "also", "say", "some", "mean", "and", "nasty", "things",
                "something", "like", "Tim", "is", "a", "little", "bitch", "or", "I", "might", "say", "something", "unassuming", "that", "when", "taken",
                "out", "of", "context", "hurts", "your", "or", "my", "self", "esteem", "don't", "you", "think", "?"],
        }
    },
    created() {
        this.$store.commit('getLocalStorage')
        this.$store.commit('setGameCode', this.$route.params.id)
        this.setFriend()
        this.checkIfAlreadySubmitted()
    },
    methods: {
        dropTile(tile, index) {
            if (index > -1) { // only splice array when item is found
                this.usedTiles.splice(index, 1); // 2nd parameter means remove one item only
            }
        },
        useTile(tile, index) {
            if (index > -1) {
                this.unusedTiles.splice(index, 1);
                this.usedTiles.push(tile);
            }
        },
        async getFriend() {
            const playerData = await getDoc(doc(db, store.state.gameCode, "player", "player", store.player.name))
            this.$store.commit('setPlayerFriend', playerData.data().friend);
        },
        async submit() {
            const poemsSnap = await getDoc(doc(db, store.state.gameCode, "poems"));
            if (poemsSnap.exists()) {
                if (this.usedTiles.length > 0) {
                    if (this.whichSubmission === 1) {
                        await setDoc(doc(db, store.state.gameCode, "poems", "poems", (store.state.player.name + "-round" + store.state.gameState.round)), {
                            content1: this.usedTiles,
                            content2: [],
                            players: [store.state.player.name],
                            prompt: 1,
                            round: 1,
                            votes: 0
                        })
                        this.whichSubmission = 2;
                        this.usedTiles = []
                    } else if (this.whichSubmission === 2) {
                        await updateDoc(doc(db, store.state.gameCode, "poems", "poems", (store.state.player.friend + "-round" + store.state.gameState.round)), {
                            content2: this.usedTiles,
                            players: [store.state.player.friend, store.state.player.name],
                        })
                        this.$router.push({ path: '/vote' })
                    }
                } else {
                    this.errorMessage = "You gotta write something..."
                }
            } else {
                this.errorMessage = "Can't find that game"
                this.$router.push({ path: '/' })
            }
        },
        async setFriend() {
            const playerData = await getDoc(doc(db, store.state.gameCode, "players", "players", store.state.player.name))
            if (playerData.exists()) {
                this.$store.commit('setPlayerFriend', playerData.data().friend);

                onSnapshot(doc(db, store.state.gameCode, "poems", "poems", (store.state.player.friend + "-round" + store.state.gameState.round)), (doc) => {
                    if (doc.data()) {
                        this.friendsTiles = doc.data().content1
                    } else {
                        console.log((store.state.player.friend + "-round" + store.state.gameState.round))
                    }
                });
            } else {
                console.log("isn't getting data")
            }
        },
        async checkIfAlreadySubmitted() {
            const poemsSnap = await getDoc(doc(db, store.state.gameCode, "poems", 'poems', (store.state.player.name + "-round" + store.state.gameState.round)));
            if (poemsSnap.exists()) {
                if (poemsSnap.data().content1 !== null) {
                    this.$router.push({ path: '/vote' })
                }
            }
        }
    },
    mounted() {
    }
}
</script>

<style>
.make-sentence {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
}

.sentence {
    width: 100%;
    height: 40vh;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 0px 10vw;
}

.button {
    font-size: 45px;
}

.sentence.half {
    min-height: 20vh;
}

.tile-list {
    width: 100%;
    min-height: 30vh;
    max-height: 30vh;
    display: flex;
    flex-wrap: wrap;
    background-image: url("../assets/wood.jpg");
    background-size: cover;
    overflow: scroll;
    margin-bottom: 5vw;
}

.tile-list::before {
    background-color: rgb(54, 27, 6, 0.5);
}

.tile-list-shadow {
    position: fixed;
    width: 100%;
    top: 30vh;
    min-height: 20px;
    box-shadow: 0px -15px 10px 5px rgba(0, 0, 0, 0.368);
}

.unused {
    margin: 10px 10px !important;
}

.word {
    margin: 10px 4px;
    padding: 4px 12px;
    font-size: 30px;
}

.current-name {
    position: fixed;
    right: 5vw;
    bottom: 5vw;
}

@media screen and (max-width: 750px) {
    .word {
        font-size: 18px;
    }

    .sentence {
        grid-template-columns: repeat(3, 1fr);
    }

    .button {
        font-size: 25px;
    }
}
</style>
