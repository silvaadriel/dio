<template>
  <v-card
    width="100%"
    color="blue darken-2"
  >
    <v-sparkline
      :labels="labels"
      :value="value"
      color="white"
      auto-draw
      line-width="2"
      padding="16"
    ></v-sparkline>
  </v-card>
</template>

<script>
export default {
  name: 'BaseChart',
  data: () => ({
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],
  }),
};
</script>
