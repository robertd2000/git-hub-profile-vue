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
          <h5 class="card-title">
            Username: <a :href="searchedUser.url">{{ searchedUser.login }}</a>
          </h5>

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
              class="btn btn-info"
              data-bs-toggle="modal"
              :data-bs-target="searchedUser.login"
            >
              Show repositories
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
.cardStyle.img {
  border-color: gray;
}
.cardStyle.btn-close {
  color: rgb(255, 254, 254);
}
.img {
  width: 185px;
  border: 5px solid rgb(107, 158, 195);
}

.card {
  margin-left: 15px;
}
.card-body {
  margin-left: 10px;
}

.card-title {
  margin-left: 15px;
}

.card-body a {
  color: rgb(23, 167, 235);
}

.btn-close {
  margin-top: -50px;
  margin-left: 300px;
}

.card-body .btn-info {
  margin-left: 18px;
  margin-top: 30px;
  color: white;
}

.list-group-item {
  background-color: inherit;
  color: inherit;
}
</style>
