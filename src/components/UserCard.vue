<template>
  <div
    class="card mb-3 border-info mb-3 shadow-lg p-3 mb-5 bg-white rounded"
    style="max-width: 540px;"
  >
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="searchedUser.avatar" alt="..." class="img" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <a :href="searchedUser.url"
            ><h5 class="card-title">Username: {{ searchedUser.login }}</h5></a
          >

          <button
            @click="deleteCard"
            type="button"
            class="btn-close position-absolute"
            aria-label="Close"
          ></button>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Repositories count: {{ searchedUser.public_repos }}
            </li>
            <li class="list-group-item">
              Followers: {{ searchedUser.followers }}
            </li>
            <li class="list-group-item">
              Following: {{ searchedUser.following }}
            </li>
          </ul>
          <div>
            <button
              @click.prevent="showRepos"
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              :data-bs-target="searchedUser.login"
            >
              Launch demo modal
            </button>
            <!-- <a @click.prevent="showRepos" href="">Show repositories</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchedUser: {
      type: Object,
      required: true,
    },
  },

  methods: {
    deleteCard() {
      this.$emit('handle-delete', this.searchedUser);
    },

    showRepos() {
      this.$emit('show-repos', this.searchedUser.login);
    },
  },
};
</script>

<style>
.img {
  width: 185px;
}

.card {
  margin-left: 15px;
}
.card-body {
  margin-left: 10px;
}

.btn-close {
  margin-top: -50px;
  margin-left: 300px;
}
</style>
