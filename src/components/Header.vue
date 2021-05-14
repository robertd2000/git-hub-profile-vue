<template>
  <nav class="navbar navbar-dark" style="background-color: rgb(107 158 195);">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Github Profiles </a>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          @change="changeTheme"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault"
          >Light/Dark theme</label
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    changeTheme() {
      this.$emit('change-theme');
    },
  },
};
</script>

<style>
.navbar-brand {
  color: white;
}

.form-check-label {
  color: white;
}
</style>
