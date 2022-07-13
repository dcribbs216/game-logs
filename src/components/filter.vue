<template>
  <div id="filter-container">
    <ul id="filter">
      <li @click="tagFilter(action, 'action', $event)">action</li>
      <li @click="tagFilter(adv, 'adventure', $event)">adventure</li>
      <li @click="tagFilter(fighting, 'fighting', $event)">fighting</li>
      <li @click="tagFilter(mmo, 'mmo', $event)">mmo</li>
      <li @click="tagFilter(platform, 'platform', $event)">platform</li>
      <li @click="tagFilter(racing, 'racing', $event)">racing</li>
      <li @click="tagFilter(rpg, 'rpg', $event)">rpg</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Filter",
  props: ["unfilteredGames"],
  data() {
    return {
      games: Object,

      tagView: false,

      currTag: "",

      action: "",
      adv: "",
      fighting: "",
      mmo: "",
      platform: "",
      racing: "",
      rpg: "",

      empty: true,
      activeEl: "",
    };
  },

  methods: {
    // filters the games based on the tag
    async tagFilter(tag, text, el) {
      // change the filter button color
      this.changeElementColor(el);

      // if the given tag is empty, load it with correct information
      if (!tag) {
        // filter 'unfilteredGames' by tag name
        tag = this.unfilteredGames.filter((game) => {
          return game.tag_name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });

        // store the 'filteredGames' in a Map to remove anu dupe values
        // tag = [...new Map(filteredGames.map(game => [game["name"], game])).values()];

        // store the tag based on tag name
        switch (text) {
          case "action":
            this.action = tag;
            break;
          case "adventure":
            this.adv = tag;
            break;
          case "fighting":
            this.fighting = tag;
            break;
          case "mmo":
            this.mmo = tag;
            break;
          case "platform":
            this.platform = tag;
            break;
          case "racing":
            this.racing = tag;
            break;
          case "rpg":
            this.rpg = tag;
            break;
        }

        this.empty = this.isEmpty(tag);
      } else if (this.currTag == tag) {
        console.log("same");
        this.currTag = null;

        this.$emit("showTag", {
          tag: tag,
          text: text,
          same: true,
        });

        return;
      } else {
        this.empty = this.isEmpty(tag);
      }

      // store the current tag values and show the results
      this.currTag = tag;

      this.$emit("showTag", {
        tag: tag,
        text: text,
        same: false,
      });
    },

    isEmpty(obj) {
      return obj.length > 0 ? false : true;
    },

    // change the color of the given element
    changeElementColor(el) {
      if (this.activeEl == el.target) {
        this.activeEl.style.background = "initial";
        this.activeEl = "";
      } else {
        if (this.activeEl) {
          this.activeEl.style.background = "initial";
          this.activeEl = "";
        }
        el.target.style.background =
          "linear-gradient(87deg, rgba(0, 181, 0, 0.849) 5%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0, 181, 0, 0.795) 95%)";
        this.activeEl = el.target;
      }
    },
  },
};
</script>
<style scoped>
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
  cursor: pointer;
  background: rgb(0, 181, 0);
  background: linear-gradient(
    87deg,
    rgba(0, 181, 0, 0.849) 5%,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 181, 0, 0.795) 95%
  ) !important;
}
</style>
