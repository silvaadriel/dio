<template>
  <div>
    <form novalidate>
      <div class="dropbox" :class="disabled ? 'dropbox--disabled' : ''">
        <v-scroll-x-reverse-transition>
          <v-btn
            @click="clickClearEvent"
            class="dropbox__clear"
            text icon color="blue darken-2"
            v-if="disabled"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-scroll-x-reverse-transition>
        <input type="file"
          ref="input"
          :name="name"
          :accept="accept"
          @change="changeEvent"
          :disabled="disabled"
          class="dropbox__input-file"
          :class="disabled ? 'dropbox__input-file--disabled' : ''"
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
    clickClearEvent(event) {
      this.$refs.input.value = '';
      this.$emit('clickClear', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .dropbox {
    border: 2px dashed #1976D2;
    border-radius: 5px;
    background: #fff;
    color: #646C7F;
    padding: 10px;
    min-height: 200px;
    position: relative;
    cursor: pointer;
    transition: ease .5s;
    &__placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: -webkit-fill-available;
      padding: 0 50px;
      font-size: 1.2em;
      text-align: center;
    }
    &:hover {
      background: #E3F2FD;
    }
    &--disabled {
      cursor: not-allowed;
    }
    &--disabled:hover {
      background: #fff;
    }
    &__clear {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 10;
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
    &__input-file--disabled {
      cursor: not-allowed;
    }
  }
</style>
