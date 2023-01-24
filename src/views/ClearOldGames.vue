<template>
    <div class="new-game">
        <div class="bottom-button" v-on:click="startGame">
            <div class="button-magnet">Clear Old Games</div>
        </div>
    </div>
</template>

<script>
import { doc, getDoc, onSnapshot, arrayUnion, updateDoc, setDoc } from "firebase/firestore"
import db from '../firebase/init.js'
export default {
    data() {
        return {
        }
    },
    methods: {
        clearOldGames() {
            const docSnap = getDoc(doc(db, "oldgames", "oldgames"))
            const oldGames = docSnap.data().gamecodes
            oldGames.map(game => {
                setDoc(doc(db, "oldgames", "oldgames"), {
                    gamecodes: []
                })
            })
            setDoc(doc(db, "oldgames", "oldgames"), {
                gamecodes: []
            })
        }
    },
}
</script>
