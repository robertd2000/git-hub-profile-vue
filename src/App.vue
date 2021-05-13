<template>
  <Header />
  <div class="container">
    <Modal
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
        />
        <button
          @click="getUserHandle(search)"
          class="btn btn-info"
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
      />
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
  },

  watch: {
    searchedList() {
      localStorage.setItem('gitHub', JSON.stringify(this.searchedList));
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
