<template>
  <div id="nav" class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/resume">Resume</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.nav {
  text-align: center;
  margin: 15px 0px 15px 0px;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  font-size: 18px;
  width: 100%;
  height: 40px;
  background: linear-gradient(rgb(19, 28, 30), rgb(19, 28, 30, 0.9), rgb(19, 28, 30, 0));
  line-height: 40px;
  /* box-shadow: 0 6px 4px rgba(0, 0, 0, 0.096); */
  z-index: 2;
}

.nav a {
  font-family: 'Source Code Pro', monospace;
  font-weight: 400;
  color: white;
  padding: 0px 30px 0px 30px;
  text-decoration: none;
  transition: 0.3s;
}

.nav a::before {
  content: "\00a0\00a0\00a0";
}

.nav a:hover {
  color: rgb(131, 234, 177);
  transition: 0.3s;
}

.nav a.router-link-exact-active {
  color: rgb(15, 179, 89);
  transition: 0.3s;
}

.nav a.router-link-exact-active::before {
  color: rgb(0, 30, 255);
  content: "~$ ";
}

.social-link-logo {
  height: 20px;
  width: 20px;
  z-index: 2;
}

.logo-link{
  position: relative;
  height: 20px;
  width: 20px;
}

.social-link-logo:hover {
  filter: brightness(1.4);
}

.inverted {
  filter: invert(1)
}

.inverted:hover {
  filter: invert(0.8);
}

.logo-link::before {
  display: none;
}
</style>