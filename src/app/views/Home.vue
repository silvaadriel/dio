<template>
  <v-container text-center fill-height>
    <v-layout column align-center justify-space-around>
      <the-dio-logo/>

      <the-app-description/>

      <file-input
        class="file-input"
        name="csv"
        accept=".csv"
        @change="handleFileInput"
        :disabled="isLoading"
      >
        <template slot="placeholder">
          <v-fade-transition leave-absolute>
            <p v-if="!isLoading">
              Drag your .csv file here to begin<br> or click to browse
            </p>
            <v-progress-circular
              :value="progress"
              v-if="isLoading"
              :indeterminate="isIndeterminate"
              :size="50"
              :width="5"
              color="primary"
            ><span class="caption">{{ progress }}%</span></v-progress-circular>
          </v-fade-transition>
        </template>
      </file-input>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      color="error"
      top="top"
    >
      {{ snackbarMessage }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import TheDioLogo from '../components/TheDioLogo.vue';
import TheAppDescription from '../components/TheAppDescription.vue';
import FileInput from '../components/FileInput.vue';

export default {
  name: 'home',
  components: {
    TheDioLogo,
    TheAppDescription,
    FileInput,
  },
  data: () => ({
    snackbar: false,
    snackbarMessage: '',
    progress: 0,
    isLoading: false,
    isIndeterminate: false,
  }),
  methods: {
    handleFileInput(event) {
      const file = this.getFile(event);
      const reader = this.setFileReader();
      this.readFileData(file, reader);
    },
    getFile(event) {
      return event.target.files[0];
    },
    handleOnLoadStart() {
      this.isLoading = true;
    },
    handleOnLoadEnd() {
      this.progress = 100;
      this.isIndeterminate = true;
    },
    handleOnLoad(event) {
      console.log(event.target.result);
    },
    errorHandler(event) {
      switch (event.target.error.code) {
        case event.target.error.NOT_FOUND_ERR:
          this.snackbarMessage = 'File Not Found!';
          this.snackbar = true;
          break;
        case event.target.error.NOT_READABLE_ERR:
          this.snackbarMessage = 'File is not readable';
          this.snackbar = true;
          break;
        case event.target.error.ABORT_ERR:
          this.snackbarMessage = 'An error occurred aborting this file.';
          this.snackbar = true;
          break;
        default:
          this.snackbarMessage = 'An error occurred reading this file.';
          this.snackbar = true;
      }
    },
    updateProgress(event) {
      if (event.lengthComputable) {
        const percentLoaded = Math.round((event.loaded / event.total) * 100);
        if (percentLoaded < 100) {
          this.progress = percentLoaded;
        }
      }
    },
    handleOnAbort() {
      this.snackbarMessage = 'Aborted file reading process';
      this.snackbar = true;
    },
    setFileReader() {
      const reader = new FileReader();

      reader.onloadstart = this.handleOnLoadStart;
      reader.onloadend = this.handleOnLoadEnd;
      reader.onload = this.handleOnLoad;
      reader.onerror = this.errorHandler;
      reader.onprogress = this.updateProgress;
      reader.onabort = this.handleOnAbort;

      return reader;
    },
    readFileData(file, reader) {
      reader.readAsText(file, 'utf-8');
    },
  },
};
</script>

<style lang="scss" scoped>
  .file-input {
    width: 100%;
    max-width: 520px;
  }
</style>
