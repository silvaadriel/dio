<template>
  <div>
    <v-container class="header" text-center fill-height>
      <v-layout column align-center justify-center>
        <base-header>
          <template slot="body">
            <router-link to="/">
              <the-dio-logo width="80"/>
            </router-link>
          </template>
        </base-header>
        <h1 class="grey--text text--darken-2 font-weight-black">{{fileName}}</h1>
        <v-btn
          icon
          x-large
          absolute
          bottom
          color="grey darken-2"
          @click="$vuetify.goTo('#scroll-target')"
        >
          <v-icon size="44">arrow_downward</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
    <v-container text-center id="scroll-target">
      <!-- <base-chart class="mb-8"/> -->
      <data-table :data="csv"/>
    </v-container>
  </div>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import TheDioLogo from '../components/TheDioLogo.vue';
import DataTable from '../components/DataTable.vue';
// import BaseChart from '../components/BaseChart.vue';

export default {
  name: 'Dashboard',
  inject: ['getCsv'],
  computed: {
    csv() {
      return this.getCsv();
    },
    fileName() {
      return this.$route.query.fn;
    },
  },
  components: {
    BaseHeader,
    TheDioLogo,
    DataTable,
    // BaseChart,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  height: 100vh;
}
</style>
