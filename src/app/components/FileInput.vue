<template>
  <div>
    <form novalidate>
      <div class="dropbox">
        <input type="file"
          :name="name"
          :accept="accept"
          @change="changeEvent"
          :disabled="disabled"
          class="dropbox__input-file"
        />
        <div class="dropbox__placeholder">
          <slot name="placeholder"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FileInput',
  props: {
    name: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      default: '*',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeEvent(event) {
      this.$emit('change', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px;
    min-height: 200px;
    position: relative;
    cursor: pointer;
    transition: ease .3s;
    &__placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 50px 0;
      font-size: 1.2em;
      text-align: center;
    }
    &:hover {
      background: lightblue;
    }
    &__input-file {
      opacity: 0;
      width: 100%;
      height: 200px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
</style>
