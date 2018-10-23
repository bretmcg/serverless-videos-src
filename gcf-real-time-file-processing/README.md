# Google Cloud Functions: real-time file processing

## [YouTube video](https://www.youtube.com/watch?v=rzHm2wu9_LM)

## Setup
### Cloud Vision API
- Enable the [Cloud Vision API](https://console.cloud.google.com/apis/library/vision.googleapis.com) on your project.
### BigQuery
1. Create a new dataset named `images_dataset` in [BigQuery](https://console.cloud.google.com/bigquery)
1. Create a new table named `image_info` with these fields:
  - `file` as type *string*
  - `description` as type *string*
  - `score` as type *float*

### Cloud Storage
1. Create a new Cloud Storage bucket.

### Cloud Functions
1. Edit `PROJECT_ID` in `index.js` and set to your project ID.
1. Deploy this cloud function using `$ gcloud functions deploy analyzeImage --runtime nodejs8 --trigger-resource *<YOUR_BUCKET_NAME>* --trigger-event google.storage.object.finalize`
