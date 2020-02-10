const c = require('./index');

let data = {
  mediaLink: 'https://storage.googleapis.com/image-analyze-bucket/cloud.jpeg'
};
let event = {
  data: data
};
c.analyzeImage(event);
