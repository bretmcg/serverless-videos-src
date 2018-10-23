const PROJECT_ID = '<YOUR_PROJECT_ID>';
const DATASET_NAME = 'images_dataset';
const TABLE_NAME = 'image_info';

const BigQuery = require('@google-cloud/bigquery');
const bigquery = new BigQuery({projectId: PROJECT_ID});
const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnotatorClient();

exports.analyzeImage = (data) => {
  let gcsImagePath = `gs://${data.bucket}/${data.name}`;
  console.log('gcsImagePath', gcsImagePath);
  return visionClient.labelDetection(gcsImagePath).then(resp => {
    let labels = resp[0].labelAnnotations.map(l => {
      return {
        file: data.name,
        description: l.description,
        score: l.score
      };
    });
    console.log('labels found:', labels);
    const dataset = bigquery.dataset(DATASET_NAME);
    return dataset.table(TABLE_NAME).insert(labels);
  }).catch(err => {
    if (err && err.name === 'PartialFailureError') {
      if (err.errors && err.errors.length > 0) {
        console.log('Insert errors:');
        err.errors.forEach(err => console.error(err));
      }
    } else {
      console.error('ERROR:', err);
    }
  });
};
