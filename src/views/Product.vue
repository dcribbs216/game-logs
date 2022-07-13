<template>
  <div id="product">
    <div id="product-container" v-if="product">
      <div id="product-detail">
        <h1 id="title">{{ product.name }}</h1>
        <div id="product-display">
          <iframe id="product-vid"
            v-if="!showImg"
            :src="'https://www.youtube.com/embed/' + product.video + '?modestbranding=1'"
          ></iframe>
          <img id="product-img"
            v-show="showImg"
            :src=" require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
          />
        </div>
        <span id="product-card" v-show="checked">
          <img id="product-cover"
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg') "
            :alt="product.name"
          />
          <label> ABOUT THE GAME </label>
          <p style="tab-size=6">
            &emsp;{{ product.description }}<br /><br />
            DEVELOPER: {{ product.company }}<br /><br />
            RELEASE DATE: {{ product.release_date }}<br /><br />
            PLATFORMS: {{ product.platform }}<br /><br />
          </p>
          <div id="btn-input">
            <button class="save-btn" v-if="!saved" @click="save">Save</button>
            <button class="saved-btn" v-if="saved" @click="remove">
              SAVED!
            </button>
          </div>
        </span>
      </div>
      <div class="content-scroll">
        <div class="data-panel">
          <img id="sub-vid"
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusVid"
          />
          <div id="play-btn"></div>
        </div>
        <div class="data-panel">
          <img
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusImg($event.composedPath)"
          />
        </div>
        <div class="data-panel">
          <img
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusImg($event.composedPath)"
          />
        </div>
        <div class="data-panel">
          <img
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusImg($event.composedPath)"
          />
        </div>
        <div class="data-panel">
          <img
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusImg($event.composedPath)"
          />
        </div>
        <div class="data-panel">
          <img
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusImg($event.composedPath)"
          />
        </div>
        <div class="data-panel">
          <img
            :src="require('../assets/img/game/' + product.img_src + '/' + product.img_src + '.jpg')"
            :alt="product.name"
            @click="focusImg($event.composedPath)"
          />
        </div>
      </div>
    </div>
    <div id="error" v-if="!product">NO PRODUCT</div>
  </div>
</template>

<script>
import axios from "axios";
// document.cookie = 'cookie2=value2; SameSite=None; Secure';

export default {
  name: "Product",
  props: ["productDetails"],

  data() {
    return {
      user: Object,
      product: Object,
      saved: false,
      checked: false,
      showImg: false,
    };
  },

  created() {
    if (localStorage.product) {
      this.product = JSON.parse(localStorage.product);
    }

    // if there is a user signed in
    if (sessionStorage.user) {
      this.user = JSON.parse(sessionStorage.user);

      // check to see if user saved game
      this.checkSaveStatus();
    } else {
      this.saved = false;
      this.checked = true;
    }
  },

  methods: {
    // save game to user's library
    async save() {
      if (sessionStorage.user) {
        await axios
          .post("../api/server.php", {
            action: "save",
            user: this.user[0].id,
            game: this.product.id,
          })
          .then((result) => {
            console.log(result);
            this.saved = true;
          });
      } else {
        console.log("User not logged in!");
      }
    },

    // remove game from user's library
    async remove() {
      if (sessionStorage.user) {
        await axios
          .post("../api/server.php", {
            action: "remove",
            user: this.user[0].id,
            game: this.product.id,
          })
          .then((result) => {
            console.log(result);
            this.saved = false;
          });
      } else {
        console.log("User not logged in!");
      }
    },

    // check the saved status of the game
    async checkSaveStatus() {
      // if there is a user, get saved status
      if (sessionStorage.user) {
        await axios
          .post("../api/server.php", {
            action: "checkSaved",
            user: this.user[0].id,
            game: this.product.id,
          })
          .then((result) => {
            this.saved = result.data.length != 0 ? true : false;
          });
      } else {
        console.log("User not logged in!");
      }

      this.checked = true;
    },

    focusVid() {
      this.showImg = false;
    },

    focusImg(e) {
      this.showImg = true;
      document.getElementById("product-img").src = e.target.src;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 10pt;
  color: white;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}

#product {
  position: relative;
  width: 100%;
  height: 825px;
}

#product-container {
  margin: 0 auto;
  width: 1000px;
  background-color: black;
}

#title {
  font-size: 15pt;
  text-align: left;
  padding: 10px 5px;
  margin: 25px 0;
  text-transform: uppercase;
  letter-spacing: +3px;
  border-radius: 0.4rem;
  border-bottom: 1px solid rgb(102, 13, 138);
  background-color: black;
  background-image: linear-gradient(90deg, black 60%, rgb(102, 13, 138));
}

#product-detail {
  display: inline-block;
  margin: 0 auto;
  width: 100%;
}

#product-vid,
#product-img {
  width: 55%;
  height: 505px;
  float: left;
  border: 1px solid rgba(106, 0, 106, 0.569);
}

#product-card {
  position: relative;
  height: 505px;
  width: 45%;
  padding: 10px 0;
  float: left;
  border-radius: 2px;
  background-image: linear-gradient(60deg, rgb(0, 0, 0) 40%, rgb(39, 39, 39));
}

#product-cover {
  display: block;
  margin: 0px auto;
  width: 80%;
  min-width: 275px;
  height: 200px;
  border: 1px solid grey;
  border-radius: 3px;
}

label {
  display: block;
  margin: 25px auto;
  margin-bottom: 7px;
  width: 90%;
  padding: 5px 15px;
  font-size: 14px;
  border-bottom: 1px solid grey;
}

#product-detail p {
  display: block;
  margin: 0px auto;
  width: 95%;
  min-width: 285px;
  padding: 5px 18px;
  font-size: 14px;
}

.content-scroll {
  overflow-x: auto;
  white-space: nowrap;
  margin: 45px auto 0 auto;
  width: 98%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.data-panel {
  display: inline-block;
}

#sub-vid {
  object-fit: contain;
}

#play-btn {
  position: relative;
  bottom: 95px;
  left: 75px;
  width: 35px;
  height: 32px;
  z-index: 1;
  border: 1px solid rgb(108, 108, 108);
  background-image: url("../assets/img/icon/play-btn.png");
  opacity: 0.7;
}

.content-scroll::-webkit-scrollbar {
  display: none;
}

.content-scroll img,
#scroll-vid {
  width: 175px;
  min-width: 150px;
  height: 130px;
  border: 1px inset rgb(133, 133, 133);
  border-radius: 0.3rem;
  margin: 5px 5px 10px 5px;
  opacity: 0.85;
  object-fit: fill;
}

.content-scroll img:hover {
  opacity: 1;
  cursor: pointer;
}

#btn-input {
  position: relative;
  text-align: center;
  bottom: -0px;
}

.save-btn,
.saved-btn {
  width: 80px;
  padding: 5px 10px;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
  background-color: black;
  letter-spacing: +3px;
  color: white;
  opacity: 0.9;
  transition: 0.2s;
  cursor: pointer;
}

.saved-btn {
  color: #d1a101;
  border-color: #d1a101;
}

.save-btn:hover {
  color: #d1a101;
  border-color: #d1a101;
}

.saved-btn:hover {
  color: white;
  border-color: #aaaaaa;
}

@media screen and (max-width: 1000px) {
  #product-container {
    width: 95%;
  }
}

@media screen and (max-width: 650px) {
  #product {
    height: 100%;
    padding: 0 15px;
  }

  #product-container {
    width: 100%;
    height: 100%;
  }

  #product-detail {
    padding: 0;
    height: 1500px;
  }

  #title {
    width: 100%;
    padding: 15px 0;
  }

  #product-vid,
  #product-img {
    width: 100%;
    height: 480px;
    object-fit: contain;
  }

  #product-cover {
    width: 200px;
    height: 400px;
    float: none;
    margin: 20px auto;
    padding: 0;
  }

  #product-card {
    position: relative;
    padding: 10px 0;
    height: 825px;
    width: 100%;
    margin: 0;
    top: 170px;
    border-left: none;
    border-top: 2px inset grey;
  }

  #product-card p {
    margin: 20px auto;
    width: 90%;
    float: none;
    padding: 20px 18px;
  }

  label {
    position: relative;
    margin-left: 15px;
  }

  #play-btn {
    left: 65px;
    bottom: 80px;
  }

  .save-btn {
    bottom: 5px;
    right: 0;
    width: 90px;
    height: 35px;
  }

  .content-scroll {
    position: relative;
    top: -900px;
    margin: 0px;
    padding: 0 5px;
  }

  .content-scroll img {
    width: 150px;
    height: 100px;
  }

  #error {
    padding: 10px;
    text-align: center;
  }
}
</style>
