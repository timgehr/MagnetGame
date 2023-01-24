<template>
  <div id="app">
    <div class="router-container">
      <router-view />
    </div>
  </div>
</template>

<script>
// Create a reference to the cities collection
export default {
  components: {
    // navBar: NavBar,
    // navSelect: NavSelect,
  }
}
</script>

<style>
#app {
  font-family: "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whites;
  background-image: url("./assets/fridgetop.jpg");
  background-position: center top;
  background-size:cover;
}

.router-container{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* padding: 30px; */
}

.magnet{
  font-family: "Georgia", Times, serif;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  border-radius: 1px;
  box-shadow: 0px 1px 0px 1px rgba(3, 3, 3, 0.85);
  background: rgba(255, 255, 255, 0.85);
  color: black;
  cursor: pointer;
  user-select: none;
}

*::-webkit-scrollbar{
    display: none;
  }
</style>
