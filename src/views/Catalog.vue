<template>
  <div id="catalog-container">
    <div id="catalog">
      <div id="title-wrapper">
        <h2 id="title">{{ title }}</h2>
      </div>
      <div id="filter-container">
        <Filter :unfilteredGames="unfilteredGames" @showTag="showTag"></Filter>
      </div>
      <ul id="fullList" v-show="!tagView">
        <li class="list-content" v-for="game in games" :key="game.id">
          <img class="img-log"
            :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
            @click="$emit('showProduct', game)"
            :alt="game.name"
          />
        </li>
      </ul>
      <ul id="tagList" v-show="tagView">
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
</template>

<script>
import Filter from "../components/filter.vue";

export default {
  name: "Catalog",

  components: { Filter },

  data() {
    return {
      title: "ALL PRODUCTS",
      games: Object,
      unfilteredGames: Object,

      tagView: false,
      currTag: "",
    };
  },
  created() {
    if (localStorage.games) {
      let temp = JSON.parse(localStorage.games);
      this.unfilteredGames = temp.all;
      this.games = [
        ...new Map(
          this.unfilteredGames.map((game) => [game["name"], game])
        ).values(),
      ];
    } else {
      console.log("Catalog.vue - NO GAMES LOADED");
    }
  },
  methods: {
    showTag({ tag, text }) {
      if (tag == this.currTag) {
        console.log("same");
        this.tagView = false;
        this.currTag = "";

        this.title = "ALL PRODUCTS";
      } else {
        this.currTag = tag;
        this.tagView = true;
        this.title = text;
      }
    },
  },
};
</script>

<style scoped>
#catalog-container {
  height: auto;
  background-image: linear-gradient(90deg, black 90%, rgba(107, 2, 63, 0.238));
  background-color: black;
}

#catalog {
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
  border-top: 1px solid rgba(0, 181, 0, 0.795);
  border-bottom: 1px solid rgba(0, 181, 0, 0.795);
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
  border: 1px solid rgba(0, 181, 0, 0.795);
  border-radius: 3px;
  margin: 0 5px;
  color: white;
  font-size: 15px;
  text-transform: uppercase;
}

#filter li:hover {
  transition: 0.1s;
  background: rgb(0, 181, 0);
  background: linear-gradient(
    87deg,
    rgba(0, 181, 0, 0.849) 5%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 181, 0, 0.795) 95%
  ) !important;
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
  user-select: none;
  list-style-type: none;
  padding: 5%;
  width: 230px;
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
  #fullList,
  #tagList {
    grid-template-columns: none;
    padding: 20px 0px;
  }

  #title-wrapper {
    padding-top: 20px;
  }

  #title {
    padding: 0;
  }

  .list-content {
    width: 310px;
    height: 100%;
  }
}
</style>
