<template>
  <v-app style="background: #E8E9EC">
    <v-scroll-x-transition>
      <router-view/>
    </v-scroll-x-transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
