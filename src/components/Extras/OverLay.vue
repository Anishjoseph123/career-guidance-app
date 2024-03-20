<template>
  <div>
    <v-overlay :value="overlay" opacity="0.2">
    <div id="spin">
      <v-progress-circular indeterminate color="primary" size="120"><div>Loading....</div></v-progress-circular>
</div>
</v-overlay>
  </div>
</template>

<script>
export default {
    props: {
    overlay: Boolean,
    },
}
</script>

<style>
#spin {
  -webkit-animation-name: grow;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: grow;
  -moz-animation-duration: 1s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: grow;
  -ms-animation-duration: 1s;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
}

@-webkit-keyframes grow {
  0% {
    -webkit-transform: scale(1);
  }

  50% {
    -webkit-transform: scale(2);
  }

  100% {
    -webkit-transform: scale(1);
  }
}

@-moz-keyframes grow {
  0% {
    -moz-transform: scale(1);
  }

  50% {
    -moz-transform: scale(2);
  }

  100% {
    -moz-transform: scale(1);
  }
}

@-ms-keyframes grow {
  0% {
    -ms-transform: scale(1);
  }

  50% {
    -ms-transform: scale(2);
  }

  100% {
    -ms-transform: scale(1);
  }
}
</style>