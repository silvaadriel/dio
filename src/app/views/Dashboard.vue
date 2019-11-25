<template>
  <v-container text-center fill-height>
    <v-layout column align-center justify-start>
      <base-header class="mb-4">
        <template slot="body">
          <router-link to="/">
            <the-dio-logo width="80"/>
          </router-link>
        </template>
      </base-header>
      <base-chart class="mb-4"/>
      <data-table :data="csv"/>
    </v-layout>
  </v-container>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import TheDioLogo from '../components/TheDioLogo.vue';
import DataTable from '../components/DataTable.vue';
import BaseChart from '../components/BaseChart.vue';

export default {
  name: 'Dashboard',
  inject: ['getCsv'],
  computed: {
    csv() {
      return this.getCsv();
    },
  },
  components: {
    BaseHeader,
    TheDioLogo,
    DataTable,
    BaseChart,
  },
};
</script>
