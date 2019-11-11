<template>
  <v-container text-center fill-height>
    <v-layout column align-center justify-space-around>
      <the-dio-logo/>

      <the-app-description/>

      <file-input style="width: 70vw" name="csv" accept=".csv" @change="handleFileInput">
        <template slot="placeholder">
          <p v-if="!isLoading">
            Drag your .csv file here to begin<br> or click to browse
          </p>
          <v-progress-linear v-if="isLoading" :value="progress"></v-progress-linear>
        </template>
      </file-input>
    </v-layout>
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
    progress: 0,
    isLoading: false,
  }),
  methods: {
    handleFileInput(event) {
      const file = this.getFile(event);
      this.readFileData(file);
    },
    getFile(event) {
      return event.target.files[0];
    },
    errorHandler(event) {
      switch (event.target.error.code) {
        case event.target.error.NOT_FOUND_ERR:
          alert('File Not Found!');
          break;
        case event.target.error.NOT_READABLE_ERR:
          alert('File is not readable');
          break;
        case event.target.error.ABORT_ERR:
          break;
        default:
          alert('An error occurred reading this file.');
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
    readFileData(file) {
      const reader = new FileReader();
      reader.onloadstart = () => this.isLoading = true;
      reader.onloadend = () => this.isLoading = false;
      reader.onload = (event) => {
        console.log(event.target.result);
      };
      reader.onerror = this.errorHandler;
      reader.onprogress = this.updateProgress;
      reader.onabort = () => alert('Abort');

      reader.readAsText(file, 'utf-8');
    },
  },
};
</script>
