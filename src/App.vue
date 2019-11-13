<template>
  <v-app style="background: #E8E9EC">
    <v-scroll-x-transition>
      <router-view/>
    </v-scroll-x-transition>
    <base-about
      :about="{ projectName: 'Dio',
                developerName: 'Adriel da Silva',
                socialMediaUrl: 'https://github.com/silvaadriel/' }"
    />
  </v-app>
</template>

<script>
import BaseAbout from './app/components/BaseAbout.vue';

export default {
  name: 'App',
  components: {
    BaseAbout,
  },
  data: () => ({
    csv: [],
  }),
  provide() {
    return {
      getCsv: this.getCsv,
      setCsv: this.setCsv,
    };
  },
  methods: {
    getCsv() {
      return this.csv;
    },
    setCsv(csv) {
      this.csv = csv;
    },
  },
};
</script>
