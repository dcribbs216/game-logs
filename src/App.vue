<template>
  <div id="main-wrapper">
    <div id="nav">
      <Nav
        :showLogout="showLogout"
        @updateLogout="updateLogout"
        @showProduct="showProduct"
      />
    </div>
    <div class="parallax">
      <p id="main-title"><router-link to="/"> Gamer Space </router-link></p>
    </div>
    <div id="app-main">
      <div class="parallax">
        <div id="router-wrapper">
          <router-view
            @updateLogout="updateLogout"
            @showProduct="showProduct"
          />
        </div>
      </div>
      <div class="parallax"></div>
    </div>
    <Foot />
  </div>
</template>

<script>
import axios from "axios";
import router from "./router/index.js";

import Nav from "./components/nav";
import Foot from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Nav,
    Foot,
  },

  data() {
    return {
      user: "",
      games: {
        all: Object,
        feat: Object,
        new: Object,
        top: Object,
        classic: Object,
      },
      showLogout: false,
      productDetails: Object,
    };
  },

  created() {
    // load all games and game categories
    // this.getGames();

    // check user log state
    if (sessionStorage.user) {
      console.log("USER LOGGED IN");
    } else {
      console.log("NO USER");
    }
  },

  methods: {
    // get all games
    async getGames() {
      await axios
        .all([
          axios.post("../api/server.php", {
            action: "fetchAll",
          }),
          axios.post("../api/server.php", {
            action: "fetchCat",
            catType: "featured",
          }),
          axios.post("../api/server.php", {
            action: "fetchCat",
            catType: "new",
          }),
          axios.post("../api/server.php", {
            action: "fetchCat",
            catType: "top_seller",
          }),
          axios.post("../api/server.php", {
            action: "fetchCat",
            catType: "classic",
          }),
        ])
        .then(
          axios.spread((all, cat1, cat2, cat3, cat4) => {
            this.games.all = all.data;
            this.games.feat = cat1.data;
            this.games.new = cat2.data;
            this.games.top = cat3.data;
            this.games.classic = cat4.data;

            // store games object in localStorage
            localStorage.setItem("games", JSON.stringify(this.games));

            console.log("Loaded All Games");
          })
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    // show the product page of the given game
    showProduct(game) {
      localStorage.setItem("product", JSON.stringify(game));
      router.push({
        name: "Product",
      });
    },

    // update the logout value
    updateLogout(val) {
      this.showLogout = val;
    },
  },
};
</script>

<style>
@import url("http://fonts.cdnfonts.com/css/games");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 50%;
}

html,
body {
  font-family: "Games", sans-serif;
  height: 53%;
}

#nav {
  z-index: 30;
}

.parallax {
  position: relative;
  background-image: url("https://www.enjpg.com/img/2020/outer-space-background-8.jpg");
  background-color: rgb(0, 0, 0);
  min-height: 230px;
  height: 100%;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  width: 100%;
  z-index: 1;
}

#router-wrapper {
  max-width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  box-shadow: 0px -3px 10px 3px rgba(0, 0, 0, 0.582);
  background-color: black;
}

#app-main {
  height: auto;
  min-height: 800px;
  position: relative;
  z-index: 1;
  color: white;
  background-color: black;
  font-size: 60px;
  transition: 0.2s;
}

#main-title {
  font-size: 80px;
  padding-top: 100px;
  padding-bottom: 100px;
  text-align: center;
  letter-spacing: +20.3px;
  /* width: 100%; */
  text-shadow: 10px 5px 5px rgb(0, 0, 0);
}

#main-title a {
  text-decoration: none;
  color: white;
}

@media only screen and (max-width: 1000px) {
  #router-wrapper {
    width: 100%;
  }
}

@media only screen and (max-width: 425px) {
  #main-title {
    font-size: 50px;
    padding-top: 80px;
  }

  .parallax {
    min-height: 280px;
  }
}
</style>
