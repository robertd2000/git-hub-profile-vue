<template>
  <div v-if="showModal" :id="userId" class="modal" :class="{ show: showModal }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Repositories:</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="repo" v-bind:key="repo" v-for="repo in modalContent">
            <a :href="repo.svn_url"> {{ repo.name }}</a> - created at
            {{ repo.created_at }}, language - {{ repo.language }}
          </div>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
    },
    modalContent: {
      type: Array,
    },
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', this.userId);
    },
  },

  computed: {
    userId() {
      return this.modalContent[0].owner.login;
    },
  },
};
</script>

<style>
.show {
  display: block;
}

.modal {
  position: absolute;
  overflow: auto;
}

.repo {
  margin-top: 15px;
  color: rgb(17, 16, 16) !important;
}

.repo a {
  font-size: 20px;
}

.modal-title {
  color: rgb(17, 16, 16) !important;
}
/* .modal-dialog,
.modal-content,
.modal-body {
  background-color: inherit;
} */
</style>
