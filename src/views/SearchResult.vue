<template>
  <div id="search-container">
    <div id="search">
      <div id="default-wrapper" v-if="!searchInput">
        <h2 id="default">{{ title }}</h2>
      </div>
      <div id="result-wrapper" v-if="searchInput">
        <p id="result">Results for '{{ searchInput }}' :</p>
      </div>
      <div id="filter-container">
        <Filter :unfilteredGames="unfilteredGames" @showTag="showTag"></Filter>
      </div>
      <div id="message-wrapper">
        <p class="message" v-if="empty">Lookin kinda empty...</p>
      </div>
      <div id="list-wrapper" v-if="!empty">
        <ul id="fullList" v-if="!tagView">
          <li class="list-content" v-for="game in games" :key="game.id">
            <img class="img-log"
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)"
              :alt="game.name"
            />
          </li>
        </ul>
        <ul id="tagList" v-if="tagView">
          <li class="list-content" v-for="game in currTag" :key="game.id">
            <img class="img-log"
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
import Filter from "../components/filter.vue";

export default {
  name: "SearchResult",
  components: { Filter },

  data() {
    return {
      unfilteredGames: Object,
      games: Object,

      searchInput: "",
      tagView: false,

      title: "",
      empty: true,
    };
  },
  created() {
    // if there are search results
    if (localStorage.search) {
      let temp = JSON.parse(localStorage.search);
      this.searchInput = temp.input;

      if (this.searchInput == "") {
        this.title = "All Products";
      }

      this.empty = this.isEmpty(temp.result);
      if (!this.empty) {
        this.unfilteredGames = temp.result;
        this.games = [
          ...new Map(
            this.unfilteredGames.map((game) => [game["name"], game])
          ).values(),
        ];
      }
    } else {
      this.empty = true;
    }
  },
  methods: {
    showTag({ tag, text, same }) {
      if (same) {
        this.title = "All Products";
        this.tagView = false;
        this.currTag = null;
        this.empty = this.isEmpty(this.games);
      } else {
        this.title = text;
        this.empty = this.isEmpty(tag);

        this.tagView = true;
        this.currTag = tag;
      }
    },

    isEmpty(obj) {
      return obj.length > 0 ? false : true;
    },
  },
};
</script>

<style scoped>
#search-container {
  min-height: 200px;
}

#search {
  height: 100%;
  min-height: 700px;
  padding: 0 20px;
  background-color: black;
  user-select: none;
  background-image: linear-gradient(
    90deg,
    black 85%,
    rgba(103, 13, 138, 0.238)
  );
}

#default-wrapper {
  border-bottom: 1px solid rgb(58, 58, 58);
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 15px;
  padding: 10px 0 5px 0;
}

#result-wrapper {
  border-bottom: 1px solid rgb(58, 58, 58);
  text-transform: uppercase;
  text-align: left;
}

#default {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  display: inline-block;
  padding-top: 0px;
  bottom: 5px;
  font-size: 18px;
  letter-spacing: +12.5px;
  text-transform: uppercase;
}

#result {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  position: relative;
  font-size: 14px;
  left: 100px;
  bottom: 3px;
  padding: 20px 0 10px 0;
  display: inline-block;
  letter-spacing: +7.5px;
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
  /* width: 200px; */
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
  position: relative;
  padding: 20px 50px;
  font-size: 20px;
  text-align: center;
  top: 40px;
  font-family: sans-serif, serif;
  color: rgb(102, 102, 102);
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

  #result {
    left: 20px;
  }
}

@media only screen and (max-width: 500px) {
  #default-wrapper {
    padding-top: 20px;
  }

  #default {
    padding: 0;
  }

  #fullList,
  #tagList {
    grid-template-columns: none;
    padding: 0px;
  }

  .list-content {
    width: 100%;
    height: 100%;
  }
}
</style>
