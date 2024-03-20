<template>
    <v-snackbar :value="SnackBarComponent.SnackbarVmodel" :color="SnackBarComponent.SnackbarColor" top :timeout="SnackBarComponent.timeout">
      <div class="text-center">{{ SnackBarComponent.SnackbarText }}</div>
    </v-snackbar>
  </template>
  <script>
  export default {
    props: {
      SnackBarComponent: Object,
    },
  };
  </script>
  