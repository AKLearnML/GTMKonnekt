#!/bin/bash

# Configuration
# Replace with your actual Project ID or set it as an environment variable
PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-"gtmkonnekt-00001-pd2"}
APP_NAME="prospect-1-pager-app"
REGION="us-central1"

if [ -z "$PROJECT_ID" ]; then
  echo "Error: GOOGLE_CLOUD_PROJECT environment variable is not set."
  echo "Please run: export GOOGLE_CLOUD_PROJECT=your-project-id"
  exit 1
fi

echo "Deploying $APP_NAME to Google Cloud Run (Project: $PROJECT_ID)..."

# Enable necessary services
echo "Enabling Cloud Build and Cloud Run services..."
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Build the image using Cloud Build
echo "Building Docker image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$APP_NAME

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy $APP_NAME \
  --image gcr.io/$PROJECT_ID/$APP_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5

echo "Deployment complete! Your app should be available at the URL above."
