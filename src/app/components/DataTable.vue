<template>
  <v-card>
    <v-card-title>
      {{ data.title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
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
import DataModel from '../models/DataModel';

export default {
  name: 'DataTable',
  data: () => ({
    search: '',
  }),
  props: {
    data: {
      type: DataModel,
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
