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
        @clickClear="handleAbort"
        :disabled="isLoading"
      >
        <template slot="placeholder">
          <v-fade-transition leave-absolute>
            <p class="ma-0" v-if="!isLoading">
              Drag your .csv file here to begin<br> or click to browse
            </p>
            <v-progress-circular
              v-else
              :value="progress"
              :indeterminate="isIndeterminate"
              :size="50"
              :width="5"
              color="primary"
            ><span class="caption">{{ progress }}%</span></v-progress-circular>
          </v-fade-transition>
          <v-radio-group class="file-input__radio-group" v-model="separator" row>
            <v-radio
              value=","
              default
            >
              <template v-slot:label>
                <div>
                  <strong class="blue--text text--darken-2 font-weight-black">
                    ,
                  </strong>
                </div>
              </template>
            </v-radio>
            <v-radio
              value=";"
            >
              <template v-slot:label>
                <div>
                  <strong class="blue--text text--darken-2 font-weight-black">
                    ;
                  </strong>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
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
import * as csv from 'jquery-csv';
import DataModel from '../models/DataModel';
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
  inject: ['getCsv', 'setCsv'],
  data: () => ({
    fileReader: null,
    fileName: '',
    separator: ',',
    snackbar: false,
    snackbarMessage: '',
    progress: 0,
    isLoading: false,
    isIndeterminate: false,
  }),
  created() {
    this.fileReader = this.setFileReader();
  },
  methods: {
    handleFileInput(event) {
      const file = this.getFile(event);
      this.fileName = this.clearFileName(file.name);
      this.readFileData(file);
    },
    clearFileName(fileName) {
      return fileName
        .replace(/(\.csv)/gi, '')
        .replace(/([^a-zA-Z0-9]+)/gi, ' ')
        .replace(/[a-zA-Z](?=[A-Z0-9])/g, '$& ')
        .toUpperCase();
    },
    getFile(event) {
      return event.target.files[0];
    },
    handleAbort() {
      this.fileReader.abort();
      this.progress = 0;
      this.isLoading = false;
      this.isIndeterminate = false;
    },
    handleOnLoadStart() {
      this.isLoading = true;
    },
    handleOnLoadEnd() {
      this.progress = 100;
      this.isIndeterminate = true;
    },
    handleOnLoad(event) {
      const data = new DataModel();
      data.fill(this.parse(csv.toObjects(event.target.result, {
        separator: this.separator,
      })));
      this.setCsv(data);
      setTimeout(
        () => this.$router.push({
          path: '/dashboard',
          query: { fn: this.fileName },
        }),
        1000,
      );
    },
    parse(data) {
      const headers = Object.keys(data[0]).map(key => ({ text: key, value: key }));

      return { headers, desserts: data };
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
      this.snackbarMessage = 'File read cancelled';
      this.snackbar = true;
    },
    setFileReader() {
      const fileReader = new FileReader();

      fileReader.onloadstart = this.handleOnLoadStart;
      fileReader.onloadend = this.handleOnLoadEnd;
      fileReader.onload = this.handleOnLoad;
      fileReader.onerror = this.errorHandler;
      fileReader.onprogress = this.updateProgress;
      fileReader.onabort = this.handleOnAbort;

      return fileReader;
    },
    readFileData(file) {
      this.fileReader.readAsText(file, 'utf-8');
    },
  },
};
</script>

<style lang="scss" scoped>
  .file-input {
    width: 100%;
    max-width: 520px;
    &__radio-group {
      position: absolute;
      bottom: -15px;
      left: 10px;
    }
  }
</style>
