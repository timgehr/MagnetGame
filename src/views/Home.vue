<template>
  <div class="home">
    <div class="title-group">
      <div class="title magnet">Magnet</div>
      <div class="title magnet">Opus</div>
    </div>
    <div class="home-buttons">
      <router-link to="/new-game" style="transform: rotate(8deg)" class="home-button magnet">New Game</router-link>
      <router-link to="/join-game" style="transform: rotate(-4deg)" class="home-button magnet">Join Game</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style>
.title-group {
  position: fixed;
  top: 8vh;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.title{
  font-size: 35px;
  margin: 0px 4px;
}

.home {
}

.home-buttons {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.home-button {
  outline: none;
  border: none;
  text-decoration: none;
  font-size: 35px;
  cursor: pointer;
  margin: 30px;
}

@media screen and (max-width: 750px) {
  .title {
  font-size: 25px;
  }
}
</style>
