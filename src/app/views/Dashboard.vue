<template>
  <base-header>
    <template slot="body">
      <router-link to="/">
        <the-dio-logo width="80"/>
      </router-link>
    </template>
  </base-header>
</template>

<script>
import BaseHeader from '../components/BaseHeader.vue';
import TheDioLogo from '../components/TheDioLogo.vue';

export default {
  name: 'Dashboard',
  components: {
    BaseHeader,
    TheDioLogo,
  },
};
</script>
