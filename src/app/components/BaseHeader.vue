<template>
  <v-container fluid class="header">
    <v-layout column align-center justify-content-center>
      <slot name="body"/>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'BaseHeader',
};
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
}
</style>
