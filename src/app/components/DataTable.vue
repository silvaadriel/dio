<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        prepend-icon="search"
        label="Search"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-spacer></v-spacer>
      <h2 class="mr-2 grey--text text--darken-2">Data Table</h2>
      <v-icon color="grey darken-2" size="54">list_alt</v-icon>
    </v-card-title>
    <v-data-table
      calculate-widths
      :headers="data.headers"
      :items="data.desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
// import DataModel from '../models/DataModel';

export default {
  name: 'DataTable',
  data: () => ({
    search: '',
  }),
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  width: 100%;
}
</style>
