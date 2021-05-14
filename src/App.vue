<template>
  <div class="app" :class="{ bodyDark: darkTheme }">
    <Header @change-theme="changeTheme" :class="{ dark: darkTheme }" />
    <div class="container">
      <Modal
        :class="{ dark: darkTheme }"
        :showModal="showModal"
        :modalContent="modalContent"
        @close-modal="closeModal"
      />
      <form action="">
        <div class="input-group mb-3">
          <input
            v-model="search"
            type="text"
            class="form-control"
            id="text"
            aria-describedby="text"
            placeholder="Github Username"
            @keydown.enter.prevent="getUserHandle(search)"
          />
          <button
            @click="getUserHandle(search)"
            class="btn btn-info"
            :class="{ btnSecondary: darkTheme }"
            type="button"
            id="button"
          >
            Search
          </button>
        </div>
      </form>
      <div v-if="alertInfo" class="alert alert-info" role="alert">
        {{ alertInfo }}
      </div>
      <div className="row">
        <user-card
          v-bind:key="searchedUser"
          v-for="searchedUser in searchedList"
          :searchedUser="searchedUser"
          :v-if="searchedUser"
          @handle-delete="handleDelete"
          @show-repos="showReposHandler"
          :class="{ cardStyle: darkTheme }"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Header from './components/Header';

import UserCard from './components/UserCard.vue';
import Modal from './components/Modal';
import { getUser, getRepos } from './api/api';

export default {
  name: 'App',
  data() {
    return {
      search: '',
      alertInfo: '',
      searchedList: [],
      showModal: false,
      modalContent: [],
      darkTheme: false,
    };
  },
  created() {
    const list = localStorage.getItem('gitHub');
    if (list) {
      this.searchedList = JSON.parse(list);
    }
  },
  components: {
    Header,
    UserCard,
    Modal,
  },
  methods: {
    async getUserHandle(user) {
      const res = await getUser(user);
      if (res.message) {
        this.alertInfo = res.message;
        return;
      }
      const {
        name,
        login,
        avatar_url,
        html_url,
        followers,
        following,
        public_repos,
      } = res;
      const newSearchedUser = {
        name,
        login,
        avatar: avatar_url,
        url: html_url,
        public_repos,
        followers,
        following,
      };
      console.log(this.search);
      this.searchedList = [...this.searchedList, newSearchedUser];
      this.alertInfo = '';
    },

    handleDelete(itemToRemove) {
      this.searchedList = this.searchedList.filter(
        (item) => item !== itemToRemove
      );
    },

    async showReposHandler(user) {
      const res = await getRepos(user);
      console.log(res);
      this.openModal(res);
    },

    openModal(res) {
      this.showModal = true;
      this.modalContent = res;
    },

    closeModal() {
      this.showModal = false;
      this.modalContent = [];
      console.log('object');
    },

    changeTheme() {
      this.darkTheme = !this.darkTheme;
      console.log(this.darkTheme);
    },
  },

  watch: {
    searchedList() {
      localStorage.setItem('gitHub', JSON.stringify(this.searchedList));
    },
  },
};
</script>

<style>
.app {
  min-height: 100vh;
}
.bodyDark {
  background-color: rgb(100, 97, 97);
}
.container {
  margin-top: 20px;
}

.dark {
  background-color: rgb(72 71 71) !important;
  color: white !important;
}

.btnSecondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.cardStyle {
  border: none;
  background: rgb(66 65 65) !important;
  color: #fff !important;
}

.btn-info {
  color: white;
}
</style>
