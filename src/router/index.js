import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewGame from '../views/NewGame.vue'
import JoinGame from '../views/JoinGame.vue'
import Lobby from '../views/Lobby.vue'
import MakeSentence from '../views/MakeSentence.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-game',
    name: 'NewGame',
    component: NewGame
  },
  {
    path: '/join-game',
    name: 'JoinGame',
    component: JoinGame
  },
  {
    path: '/lobby/:id',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/make-sentence/:id',
    name: 'MakeSentence',
    component: MakeSentence
  },
  {
    path: '/play/:id',
    name: 'play',
    component: MakeSentence
  },
  // {
  //   path: '/play/:id-:username',
  //   name: 'play',
  //   component: MakeSentence
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
