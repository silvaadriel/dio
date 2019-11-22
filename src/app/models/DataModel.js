export default class DataModel {
  constructor() {
    this.title = '';
    this.headers = [];
    this.desserts = [];
  }

  fill(data) {
    const { title, headers, desserts } = data;

    this.title = title;
    this.headers = headers;
    this.desserts = desserts;
  }
}
