<template>
  <div id="nav">
    <ul id="nav-content">
      <!-- regular navigation view -->
      <div id="reg-wrapper">
        <li class="nav-reg"><router-link to="/">Home</router-link></li>
        <li class="nav-reg">
          <router-link to="/catalog">Catalog</router-link>
        </li>
        <li class="nav-reg"><router-link to="/about">About</router-link></li>
      </div>

      <!-- mobile navigation view w/ dropdown menu -->
      <div id="mobile-wrapper">
        <button class="dropdown-button" @click="toggleMobileDrop">
          <div class="menu-icon"></div>
          <div class="menu-icon"></div>
          <div class="menu-icon"></div>
        </button>
        <transition name="reg-dropdown">
          <div class="dropdown" v-if="mobileDrop">
            <li class="nav-drop"><router-link to="/">Home</router-link></li>
            <li class="nav-drop">
              <router-link to="/catalog">Catalog</router-link>
            </li>
            <li class="nav-drop">
              <router-link to="/about">About</router-link>
            </li>
          </div>
        </transition>
      </div>

      <!-- searchbar and account wrapper -->
      <div id="util-wrapper">
        <div id="search-wrapper">
          <div class="searchbar">
            <form @submit.prevent="searchGames">
              <input
                class="searchQueryInput"
                type="text"
                name="searchQueryInput"
                v-model="search.input"
                placeholder="Search"
                autocomplete="off"
              />
              <button
                class="searchQuerySubmit"
                type="button"
                name="searchQuerySubmit"
                @click="searchGames"
              >
                <svg class="submit-icon" viewBox="0 0 24 24">
                  <path
                    fill="#666666"
                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,
                      20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,
                      1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <span class="account-wrapper">
          <li class="nav-account" @click="toggleAccountDrop">
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path
                d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,
                  4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,
                  0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,
                  1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,
                  17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
              ></path>
            </svg>
          </li>
          <transition name="account-dropdown">
            <div class="account-dropdown" v-if="accountDrop">
              <li class="nav-drop">
                <router-link to="/library">Library</router-link>
              </li>
              <li class="nav-drop" v-if="showLogoutBtn" @click="logout">
                <span>Log Out</span>
              </li>
              <li class="nav-drop" v-if="!showLogoutBtn">
                <router-link to="/auth">Log In</router-link>
              </li>
            </div>
          </transition>
        </span>
      </div>
    </ul>
  </div>
</template>
<script>
import router from "../router/index.js";

export default {
  name: "Nav",
  props: ["showLogout"],

  data() {
    return {
      searchInput: "",
      search: {
        input: "",
        result: "",
      },
      unfilteredGames: Object,
      mobileDrop: false,
      accountDrop: false,
      showLogoutBtn: false,
    };
  },

  created() {
    // get 'games' object from local storage
    if (localStorage.games) {
      let temp = JSON.parse(localStorage.games);
      this.unfilteredGames = temp.all;
    }

    // logout button dependent on there being a user
    this.showLogoutBtn = sessionStorage.user ? true : false;
  },

  updated() {
    this.showLogoutBtn = this.showLogout;
  },

  mounted() {
    document.addEventListener("click", this.close);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },

  methods: {
    // search 'games' for the game(s) that matches the input
    async searchGames() {
      // filter 'games' by the given name
      this.search.result = this.unfilteredGames.filter((game) => {
        return (
          game.name.toLowerCase().indexOf(this.search.input.toLowerCase()) > -1
        );
      });

      // store the search object in localStorage 'results'
      localStorage.setItem("search", JSON.stringify(this.search));

      if (this.$route.name == "SearchResult") {
        this.$router.go();
      } else {
        // go to the results page
        await router.push({
          name: "SearchResult",
        });
      }

      // clear search input field
      this.search.input = "";
    },

    // log user out
    logout() {
      // clear session storage
      sessionStorage.clear;
      sessionStorage.setItem("user", "");

      // hide logout button
      this.showLogoutBtn = false;

      // update the logout button display value in parent
      this.$emit("updateLogout", false);

      // push user to home page if currently viewing the user's 'Library' page
      if (this.$route.name === "Library") {
        router.push({ path: "../views/" });
      }
    },

    // toggle the account dropdown menu display
    toggleAccountDrop() {
      this.accountDrop = !this.accountDrop;
    },

    // toggle the mobile dropdown menu display
    toggleMobileDrop() {
      this.mobileDrop = !this.mobileDrop;
    },

    // !!! NEEDS A FIXIN !!!
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.mobileDrop = false;
        this.accountDrop = false;
      }
    },
  },
};
</script>

<style scoped>
#nav {
  letter-spacing: +4.5px;
  background-color: black;
  list-style-type: none;
  top: 0;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 30px;
  box-shadow: 0px 0px 27px 6px rgba(0, 35, 49, 0.801);
}

#mobile-wrapper {
  display: none;
  position: fixed;
  letter-spacing: +4.5px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: 0px 0px 27px 6px rgba(49, 11, 0, 0.801);
  top: 0;
  position: fixed;
  width: 100%;
}

#nav-content {
  max-width: 1230px;
  margin: 0% auto;
  height: 100%;
}

#reg-wrapper {
  display: inline-block;
  text-align: left;
}

#util-wrapper {
  z-index: 30;
  float: right;
}

.nav-reg,
.nav-reg a,
.nav-account {
  display: inline;
  text-decoration: none;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  text-transform: uppercase;
  color: white;
  text-align: center;
  cursor: pointer;
}

.nav-reg a {
  position: relative;
  padding: 6px 16px;
  top: 5px;
  border-left: 0.5px solid rgba(120, 0, 136, 0.568);
  opacity: 0.85;
  transition: 0.3s;
}

.nav-account {
  width: 60px;
  position: relative;
  padding: 7px 10px;
  border-left: 1px solid #bdbdbd80;
  border-right: 1px solid #bdbdbd82;
  opacity: 0.8;
  transition: 0.3s;
}

.nav-reg a:hover {
  opacity: 1;
  background-image: linear-gradient(270deg, black 40%, #d000eba8);
}

.nav-account:hover {
  opacity: 1;
  background-image: linear-gradient(90deg, black 40%, rgb(23, 0, 87));
  border-left: 1px solid rgba(7, 0, 21, 0.486);
  border-right: 1px solid rgb(12, 0, 87);
}

.menu-icon {
  width: 40px;
  height: 5px;
  background-color: black;
  margin: 4.5px 0;
  border-radius: 1rem;
}

.svg-icon {
  position: relative;
  top: 4px;
  width: 1.2em;
  height: 100%;
}

.svg-icon path {
  fill: #bdbdbd;
}

/*  ----- Dropdown Menus ------ */

.dropdown,
.account-dropdown {
  position: absolute;
  min-width: 140px;
  top: 35px;
  z-index: 5;
  text-align: center;
  background-color: black;
  border: 2px groove #161616;
  border-radius: 0.2rem;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.582);
  background-image: linear-gradient(270deg, rgb(0, 0, 0) 60%, rgb(74, 46, 0));
}

.account-dropdown {
  list-style: none;
  position: relative;
  width: 100px;
  top: 7px;
  left: 175px;
  background-image: linear-gradient(60deg, rgb(0, 0, 0) 60%, rgb(23, 0, 87));
}

.nav-drop a,
.nav-drop span {
  color: rgb(255, 255, 255);
  text-decoration: none;
  display: block;
  padding: 10px 5px;
  border-radius: 0.1rem;
  z-index: 20;
  opacity: 0.8;
  transition: 0.3s;
}

.account-dropdown :not(:first-child) {
  border-top: 2px groove #292542;
}

.dropdown :not(:first-child) {
  border-top: 1px groove #878787;
}

.dropdown .nav-drop a:hover,
.dropdown .nav-drop span:hover {
  background-image: linear-gradient(270deg, rgb(0, 0, 0) 60%, rgb(109, 67, 1));
  cursor: pointer;
  opacity: 1;
}

.account-dropdown .nav-drop a:hover,
.account-dropdown .nav-drop span:hover {
  background-image: linear-gradient(60deg, rgb(0, 0, 0) 60%, rgb(32, 2, 115));
  cursor: pointer;
  opacity: 1;
}

.dropdown-button {
  margin: 0 1px;
  padding: 0 8px;
  float: left;
  color: white;
  background-color: #9c3f00;
  border: none;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 0.2rem;

  transition: 0.3s;
}

.dropdown-button:hover {
  background-color: rgb(54, 0, 56);
  cursor: pointer;
}

.reg-dropdown-enter-to,
.reg-dropdown-leave-active,
.account-dropdown-enter-to,
.account-dropdown-leave-active {
  transition: all 0.35s;
}

.reg-dropdown-enter-from,
.reg-dropdown-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.account-dropdown-enter-from,
.account-dropdown-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* -------- Searchbar -------- */

#search-wrapper {
  position: relative;
  display: inline-block;
  margin-right: 50px;
}

.searchbar {
  flex-direction: row;
}

.searchQueryInput {
  margin: 1px 1px;
  min-width: 220px;
  height: 100%;
  padding-left: 0.5rem;
  font-size: 13px;
  font-family: sans-serif;
  color: rgb(255, 255, 255);
  background: rgb(26, 26, 26);
  outline: none;
  border: 1px solid rgb(41, 40, 40);
  border-radius: 2.5rem;
}

.searchQuerySubmit {
  width: 3.5rem;
  margin-left: -3.5rem;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
}

.submit-icon {
  position: relative;
  top: 3px;

  width: 100%;
  height: 16px;
}

.searchQuerySubmit:hover {
  cursor: pointer;
}

@media only screen and (max-width: 650px) {
  .searchQueryInput {
    width: 90%;
    min-width: 190px;
    height: 26px;
  }

  .submit-icon {
    position: relative;
    top: 2px;
  }

  #reg-wrapper {
    display: none;
  }

  #mobile-wrapper {
    min-width: 330px;
    display: revert;
    background-color: rgba(0, 0, 0, 0.988);
  }

  #search-wrapper {
    position: relative;
    left: 30px;
    top: 3px;
  }

  .nav-account {
    padding: 12px 10px;
  }

  .account-dropdown {
    left: 140px;
  }

  .svg-icon {
    top: 6px;
  }
}
</style>