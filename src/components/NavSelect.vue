<template>
  <div id="navselect" class="navselect">
    <div class="dropdown">
      <div class="dropdown-container">
        <h1 class="dropdown-name">Tim Gehrsitz</h1>
        <div class="dropdown-box" v-on:click="ddnShow = !ddnShow">
          <span class="material-symbols-outlined">
            menu
          </span>
        </div>
      </div>
      <div class="dropdown-content" v-if="ddnShow">
        <p v-on:click="navRoute('/')">
          <router-link to="/">Home</router-link>
        </p>
        <p v-on:click="navRoute('projects')">
          <router-link to="/projects">Projects</router-link>
        </p>
        <p v-on:click="navRoute('resume')">
          <router-link to="/resume">Resume</router-link>
        </p>
        <p v-on:click="navRoute('photos')">
          <router-link to="/photos">Photography</router-link>
        </p>
        <p v-on:click="navRoute('music')">
          <router-link to="/music">Music</router-link>
        </p>
        <p v-on:click="navRoute('contact')">
          <router-link to="/contact">Contact Me</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ddnShow: false
    }
  },
  methods: {
    navRoute(target) {
      this.$router.push(target)
      this.ddnShow = false
    },
    call() {
      this.ddnShow = false
    }
  }
}
</script>

<style>
.dropdown {
  text-align: center !important;
  cursor: pointer;
  height: 60px;
  width: 100%;
  border: 0px;
  outline: 0px;
  color: white;
  font-weight: 400 !important;
  font-size: 0px;
  transition: 0.15s;
}

.dropdown-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
  align-items: center;
  height: 100%;
}

.dropdown:hover {
  transition: 0.15s;
}

.dropdown-content {
  margin: 60px 0px 0px 0px;
  width: 100vw;
  height: 100vh;
  display: block;
  position: absolute;
  background: rgb(19, 28, 30, 0.975);
  font-size: 20px !important;
  left: 0px;
  top: 0px;
  text-align: left;
  z-index: 10;
  line-height: 60px;
}

.dropdown-name {
  font-size: 20px;
  min-width: 140px;
  text-align: left;
  margin-right: 30px;
}

.dropdown-box{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
}

.dropdown-content p {
  margin: 0px 0px 0px 0px;
}

.dropdown-content p:hover {
  background: rgba(0, 0, 0, 0.233);
}

.dropdown-content p a {
  padding-left: 40px;
  text-decoration: none;
  color: white;
  width: 100%;
}

#logocontainer {
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: 200ms;
}

#logo2 {
  padding: 5px 0px 5px 0px;
  height: 50px;
  transition: 0.25s;
}

#callButton:hover {
  background: rgba(126, 201, 137, 0.329);
  border-radius: 30px;
}

.navselect {
  display: none;
  text-align: center;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  font-size: 18px;
  width: 100%;
  height: 60px;
  background: rgb(19, 28, 30);
  z-index: 10;
}

.navselect select {
  font-weight: 300;
  color: #000000;
  padding: 0px 30px 0px 30px;
  text-decoration: none;
}

.navselect a.router-link-exact-active {
  color: #2e835d;
}

.selectnav {
  text-align: center;
  height: 40px;
  width: fit-content;
  font-family: "Open Sans", sans-serif;
  border: 0px;
  outline: 0px;
  margin-left: 40px;
  color: white;
  font-weight: 400 !important;
  font-size: 26px !important;
  padding-left: 60px !important;
  appearance: none;
}

.selectnav-content {
  display: none;
  position: absolute;
  background-color: #612323;
  min-width: 160px;
  padding: 12px 16px;
  z-index: 1;
}

.selectnav:active {
  border: 0px;
  outline: 0px;
}
</style>