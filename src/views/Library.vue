<template>
  <div id="library-container">
    <div id="library">
      <div id="title-wrapper">
        <h2 id="title">Your Library</h2>
      </div>
      <div id="filter-container">
        <Filter :unfilteredGames="unfilteredGames" @showTag="showTag"></Filter>
      </div>
      <div id="message-wrapper">
        <p class="message" v-if="!logSwitch">
          <span id="logLink" @click="openLogin">Log in</span> to view your 'stuff'!
        </p>
        <p class="message" v-if="logSwitch && empty">Lookin kinda empty...</p>
      </div>
      <div id="list-wrapper" v-if="!empty && user">
        <ul id="fullList" v-if="!tagView">
          <li class="list-content" v-for="game in savedGames" :key="game.id">
            <img class="img-log" 
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)" 
              :alt="game.name"
            />
          </li>
        </ul>
        <ul id="tagList" v-if="tagView">
          <li class="list-content" v-for="game in currTag" :key="game.id">
            <img
              class="img-log"
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)"
              :alt="game.name"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index.js";
import Filter from "../components/filter.vue";

export default {
  name: "Library",
  components: { Filter },

  data() {
    return {
      user: Object,
      savedGames: Object,
      unfilteredGames: Object,

      tagView: false,
      currTag: "",
      empty: Boolean,

      logSwitch: false,
    };
  },

  created() {
    if (sessionStorage.user) {
      this.user = JSON.parse(sessionStorage.user);
      this.logSwitch = true;
      this.getSaved();
    }
  },

  methods: {
    showTag({ tag, same }) {
      if (same) {
        this.tagView = false;
        this.currTag = null;
        this.empty = this.isEmpty(this.savedGames);
        return;
      }

      this.empty = this.isEmpty(tag);

      this.tagView = true;
      this.currTag = tag;
    },

    // go to login page
    openLogin() {
      router.push({ path: "../views/auth" });
    },

    // get all the games saved by the user
    async getSaved() {
      // get user's saved games
      await axios
        .post("../api/server.php", {
          action: "getSaved",
          user: this.user[0].id,
        })
        .then((savedResult) => {
          if (savedResult.data.length > 0) {
            this.unfilteredGames = savedResult.data;
            this.savedGames = [
              ...new Map(
                this.unfilteredGames.map((game) => [game["name"], game])
              ).values(),
            ];
          }
        });

      this.empty = this.isEmpty(this.savedGames);
    },

    isEmpty(obj) {
      return obj.length > 0 ? false : true;
    },
  },
};
</script>

<style scoped>

#library-container {
  min-height: 750px;
  background-image: linear-gradient(90deg, black 90%, rgba(85, 24, 7, 0.238));
  background-color: black;
  user-select: none;
  padding: 0 20px;
}

#title-wrapper {
  border-bottom: 1px solid rgb(58, 58, 58);
  margin-bottom: 5px;
  text-align: center;
  padding: 10px 0 5px 0;
}

#title {
  position: relative;
  display: inline-block;
  bottom: 5px;
  font-size: 18px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  letter-spacing: +12.5px;
  text-transform: uppercase;
}

#filter {
  text-align: center;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 25px auto 0 auto;
  max-width: 920px;
  height: 40px;

  font: 1em sans-serif;
  white-space: nowrap;
  border-top: 1px solid green;
  border-bottom: 1px solid green;

  user-select: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#filter::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#filter {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

#filter li {
  position: relative;
  bottom: 31px;
  display: inline-block;
  list-style-type: none;

  padding: 5px;
  min-width: 120px;
  background-color: black;
  border: 1px solid green;
  border-radius: 3px;
  margin: 0 5px;
  color: white;
  font-size: 15px;
  text-transform: uppercase;
}

#filter li:hover {
  background: rgb(0, 181, 0);
  background: linear-gradient(
    87deg,
    rgba(0, 181, 0, 0.849) 5%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 181, 0, 0.795) 95%
  ) !important;
  transition: 0.1s;
}

.message {
  font-family: sans-serif, serif;
  position: relative;
  padding: 20px 50px;
  font-size: 20px;
  text-align: center;
  top: 40px;
  color: rgb(102, 102, 102);
}

#logLink {
  color: rgb(195, 0, 255);
  cursor: pointer;
}

#fullList,
#tagList {
  display: grid;
  grid-template-columns: 230px 230px 230px 230px;
  grid-template-rows: auto;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.list-content {
  list-style-type: none;
  padding: 5%;
  width: 230px;
  /* border: 1px solid yellow;  */
}

.img-log {
  width: 100%;
  height: 320px;
  border: 1px solid grey;
  opacity: 0.85;
}

.img-log:hover {
  opacity: 1;
  cursor: pointer;
}

@media only screen and (max-width: 955px) {
  #fullList,
  #tagList {
    grid-template-columns: 230px 230px 230px;
  }
}

@media only screen and (max-width: 730px) {
  #fullList,
  #tagList {
    grid-template-columns: 230px 230px;
  }
}

@media only screen and (max-width: 500px) {
  #title-wrapper {
    padding-top: 20px;
  }

  #title {
    padding: 0;
  }

  #fullList,
  #tagList {
    grid-template-columns: none;
    padding: 0px;
  }

  .list-content {
    width: 310px;
    height: 100%;
  }
}
</style>
