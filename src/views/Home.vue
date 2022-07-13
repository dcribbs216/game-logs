<template>
  <div id="home-container">
    <div id="home">
      <div class="billboard-container">
        <label for="featured">Featured</label>
        <div class="billboard" v-for="(game, index) in games.feat" :style="styleSlides(index)" :key="game.id">
          <div class="billboard-cover">
            <img 
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)"
              :alt="game.name"
            />
          </div>
          <div class="billboard-desc">
            <div class="title" @click="$emit('showProduct', game)">
              {{ game.name }}
            </div>
            <div class="billboard-img">
              <img 
                :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
                @click="$emit('showProduct', game)"
                :alt="game.name"
              />
             <img 
                :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
                @click="$emit('showProduct', game)"
                :alt="game.name"
              />
              <img 
                :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
                @click="$emit('showProduct', game)"
                :alt="game.name"
               />
              <img 
                :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
                @click="$emit('showProduct', game)"
                :alt="game.name"
              />
            </div>
          </div>
          <div class="mobile-title" @click="$emit('showProduct', game)">
            {{ game.name }}
          </div>
        </div>
        <a class="billboard-prev" @click="plusSlides(-1)">&#10094;</a>
        <a class="billboard-next" @click="plusSlides(1)">&#10095;</a>
      </div>

      <!-- New -->
      <div class="sub-container">
        <label for="new">New</label>
        <div class="sub-scroll" for="new">
          <span v-for="game in games.new" :key="game.id">
            <img
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)"
              :alt="game.name"
            />
          </span>
        </div>
        <a class="sub-prev" @click="scroll_left('new')">&#10094;</a>
        <a class="sub-next" @click="scroll_right('new')">&#10095;</a>
      </div>

      <!-- Top Seller -->
      <div class="sub-container">
        <label for="top">Top Sellers</label>
        <div class="sub-scroll" for="top">
          <span v-for="game in games.top" :key="game.id">
            <img
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)"
              :alt="game.name"
            />
          </span>
        </div>
        <a class="sub-prev" @click="scroll_left('top')">&#10094;</a>
        <a class="sub-next" @click="scroll_right('top')">&#10095;</a>
      </div>

      <!-- Classics -->
      <div class="sub-container">
        <label for="classic">Classics</label>
        <div class="sub-scroll" for="classic">
          <span v-for="game in games.classic" :key="game.id">
            <img
              :src="require('../assets/img/game/' + game.img_src + '/' + game.img_src + '.jpg')"
              @click="$emit('showProduct', game)"
              :alt="game.name"
            />
          </span>
        </div>
        <a class="sub-prev" @click="scroll_left('classic')">&#10094;</a>
        <a class="sub-next" @click="scroll_right('classic')">&#10095;</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      games: Object,
      slideIndex: 0,
    };
  },

  created() {
    // get and store the 'games' object
    if (localStorage.games) {
      this.games = JSON.parse(localStorage.games);
    }
  },

  methods: {
    // scroll sub-scroll right
    scroll_right(id) {
      let content = document.querySelector(".sub-scroll[for=" + id + "]");
      // content.scrollLeft -= 300;
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
        content.scrollLeft += 25;
        scrollAmount += 25;
        if (scrollAmount >= 280) {
          window.clearInterval(slideTimer);
        }
      }, 25);
    },

    // scroll sub-scroll left
    scroll_left(id) {
      let content = document.querySelector(".sub-scroll[for=" + id + "]");
      var scrollAmount = 0;
      var slideTimer = setInterval(function () {
        content.scrollLeft -= 25;
        scrollAmount += 25;
        if (scrollAmount >= 280) {
          window.clearInterval(slideTimer);
        }
      }, 25);
    },

    // Next/previous controls
    plusSlides(n) {
      // temp variable for slide index + n
      var temp = this.slideIndex + n;

      // set slide index
      if (temp > this.games.feat.length - 1) {
        this.slideIndex = 0; // to the first slide, if over the slide length
      } else if (temp < 0) {
        this.slideIndex = this.games.feat.length - 1; // to the last slide, if less than slide length
      } else {
        this.slideIndex += n; // to the next slide
      }
    },

    // show/hide billboard slides
    styleSlides: function (n) {
      var style = {};

      // if the billboard slide isnt the current slide (slideIndex)
      if (n != this.slideIndex) {
        style.display = "none";
      } else {
        style.display = "block";
      }

      return style;
    },
  },
};
</script>
<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

#home-container {
  background-image: linear-gradient(90deg, black 90%, rgba(7, 30, 85, 0.241));
  background-color: black;
  padding-bottom: 70px;
  height: 100%;
}

#home {
  margin: auto;
  max-width: 900px;
}

label {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  position: relative;
  display: inline-block;
  margin: 10px auto;
  width: 100%;
  padding: 0px 5px 3px 5px;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: +6.3px;
  border-bottom: 1px solid rgb(102, 7, 126);
  border-radius: 0.4rem;
  background-color: black;
  background-image: linear-gradient(90deg, black 60%, rgb(102, 13, 138));
}

.billboard-container {
  position: relative;
  margin: auto;
  padding: 0px 0 45px 0;
  min-height: 400px;
}

.billboard {
  display: none;
  position: relative;
  height: 291px;
  max-width: 820px;
  border: 1px solid rgb(68, 31, 71);
  border-radius: 5px;
  user-select: none;
  margin: 0 auto;

  animation: fadeIn 0.8s;
  -webkit-animation: fadeIn 0.8s;
  -moz-animation: fadeIn 0.8s;
  -o-animation: fadeIn 0.8s;
  -ms-animation: fadeIn 0.8s;
}

.title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: +2px;
  border-bottom: 1px outset rgb(6, 0, 84);
  letter-spacing: 2px;
  text-transform: uppercase;
  user-select: none;
  background-image: linear-gradient(60deg, rgb(0, 0, 0) 60%, rgb(37, 36, 46));
}

.mobile-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: none;
  font-size: 16px;
  text-align: center;
  padding: 10px;
  border: 1px outset rgb(6, 0, 84);
  line-height: 24px;
  letter-spacing: 2px;
  text-transform: uppercase;
  background-image: linear-gradient(60deg, rgb(0, 0, 0) 60%, rgb(37, 36, 46));
}

.mobile-title:hover,
.title:hover {
  cursor: pointer;
}

.billboard-cover {
  position: relative;
  z-index: 1;
  width: 55%;
  max-width: 600px;
  float: left;
  height: 100%;
  max-height: 600px;
  border-right: 1px outset rgb(48, 25, 45);
  border-radius: 5px;
  box-shadow: 15px 0px 30px 0px rgb(0, 0, 0);
}

.billboard-cover img {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-fit: fill;
  opacity: 0.85;
}

.billboard-cover img:hover {
  cursor: pointer;
  opacity: 1;
}

.billboard-desc {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  float: left;
  position: relative;
  font-size: 15px;
  text-align: center;
  height: 100%;
  width: 45%;
  color: #f2f2f2;
  background-color: rgb(0, 0, 0);
}

.billboard-img {
  position: absolute;
  width: 100%;
  padding: 2px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 4px;
  /* border: solid 1px orange; */
}

.billboard-img img {
  object-fit: contain;
  height: 120px;
  width: 100%;
  border: rgb(53, 48, 44) inset 1px;
  border-radius: 4px;
  object-fit: fill;
  opacity: 0.85;
}

.billboard-img img:hover {
  opacity: 1;
  cursor: pointer;
}

.sub-container {
  /* height: 200px; */
  font-size: 0px;
}

.sub-scroll::-webkit-scrollbar {
  display: none;
}

.sub-scroll {
  position: relative;
  margin: 0 auto;
  max-width: 830px;
  min-height: 180px;
  white-space: nowrap;
  overflow-x: hidden;
  user-select: none;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.sub-scroll img {
  margin: 2px 3px;
  height: 180px;
  width: 290px;
  border-radius: 0.3rem;
  opacity: 0.85;
  border: 1px outset rgb(54, 34, 51);
}

.sub-scroll img:hover {
  opacity: 1;
  border: 1px outset rgb(44, 44, 44);
  cursor: pointer;
}

/* Next and previous buttons for billboard and sub scroll*/
.billboard-prev,
.billboard-next,
.sub-prev,
.sub-next {
  cursor: pointer;
  position: absolute;
  bottom: 160px;
  padding: 10px;
  color: black;
  font-weight: bold;
  font-size: 50%;
  transition: 0.3s ease;
  border-radius: 1px;
  user-select: none;
  height: 70px;
  z-index: 1;
  opacity: 0.8;
  background-image: linear-gradient(90deg, #272727af 5%, #b39800);
}

/*  background-image gradient change fir prev buttons */
.billboard-prev,
.sub-prev {
  background-image: linear-gradient(270deg, #252525af 5%, #b39800);
}

/* Position the "next button" to the right */
.billboard-next {
  right: 0px;
}

.billboard-prev {
  left: 0px;
}

.sub-prev,
.sub-next {
  position: relative;
  bottom: 133px;
  font-size: 30px;
}

.sub-next {
  float: right;
  left: 5px;
}

.sub-prev {
  float: left;
  right: 5px;
}

/* On hover over next and prev buttons, add background gradient with a transition*/
.billboard-next:hover,
.sub-next:hover,
.billboard-prev:hover,
.sub-prev:hover {
  opacity: 1;
  transition: 0.2s;
  border: 0.1px solid rgb(49, 49, 49);
}

@media only screen and (max-width: 1000px) {
  #home {
    width: 90%;
  }
}

@media only screen and (max-width: 660px) {
  .billboard {
    border: none;
  }

  .billboard-cover {
    width: 100%;
    float: none;
  }

  .billboard-desc {
    display: none;
  }

  .mobile-title {
    display: revert;
  }

  .sub-scroll img {
    width: 49%;
  }
}
</style>
