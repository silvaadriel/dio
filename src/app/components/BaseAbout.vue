<template>
  <v-footer padless class="font-weight-medium">
    <v-card
        flat
        tile
        width="100%"
        class="footer text-center"
      >
        <v-card-text class="grey--text text--darken-1">
          <strong>{{ about.projectName }}</strong> by
          <a
            target="_blank"
            class="footer__link"
            :href="about.socialMediaUrl"
          >
            {{ about.developerName }}.
          </a>
          The source code is licensed
          <a
            target="_blank"
            class="footer__link"
            href="https://www.gnu.org/licenses/gpl-3.0.pt-br.html"
          >
            GNU General Public License v3.0
          </a>
        </v-card-text>
      </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'BaseAbout',
  props: {
    about: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: #E8E9EC;
  &__link {
    text-decoration: none;
    font-weight: 500;
  }
}
</style>
