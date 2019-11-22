<template>
  <div>
    <v-img :width="width" alt="Dio logo" src="../assets/dio-logo.svg"></v-img>
  </div>
</template>

<script>
export default {
  name: 'TheDioLogo',
  props: {
    width: {
      type: String,
    },
  },
};
</script>
