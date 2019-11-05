<template>
  <v-container text-center fill-height>
    <v-layout column align-center justify-space-around>
      <the-dio-logo/>

      <the-app-description/>

      <file-input/>
    </v-layout>
  </v-container>
</template>

<script>
import TheDioLogo from '../components/TheDioLogo.vue';
import TheAppDescription from '../components/TheAppDescription.vue';
import FileInput from '../components/FileInput.vue';

export default {
  name: 'home',
  components: {
    TheDioLogo,
    TheAppDescription,
    FileInput,
  },
};
</script>
