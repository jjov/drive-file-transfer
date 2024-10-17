# FILE-TRANSFER-LAMBDA

Project with dummy code required to do the integration with Google Drive for listing and downloading files

Required env variables:

|Environment Variable|Description|
| ----------- | ----------- |
|GOOGLE_CREDENTIALS|JSON representation for your Google Drive Credentials|

## GOOGLE CREDENTIALS SETUP
To obtain the GOOGLE_CREDENTIALS single-line JSON from your Google Drive account, follow these steps:

### Step 1: Create a Google Cloud Project and Enable Google Drive API
1.	Go to the Google Cloud Console: Google Cloud Console.
2.	Create a new project:
	* Click on the project selector (top bar).
	* Click on “New Project.”
	* Name the project and create it.
3.	Enable the Google Drive API:
    * In the Cloud Console, go to the API & Services > Library.
    * Search for “Google Drive API.”
    * Click on “Google Drive API” and enable it for your project.

### Step 2: Create Service Account Credentials
1.	Go to API & Services > Credentials in the left menu.
2.	Click Create Credentials and select Service Account.
3.	Give the service account a name and click Create.
4.	Under the Roles section, assign the role “Viewer” or any role that gives the service account read access to files in Google Drive.
5.	Click Done.

### Step 3: Create and Download the JSON Key File
1.	After creating the service account, you will be able to manage it in the Credentials section.
2.	Select your service account from the list.
3.	Under Keys, click Add Key and select JSON.
4.	This will download a .json file to your local machine. This file contains the necessary credentials.

### Step 4: Convert the JSON to a Single Line
1.	Open the .json file in a text editor.
2.	The contents will look something like this:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBg...",
  "client_email": "your-service-account@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project-id.iam.gserviceaccount.com"
}
```
3.	To convert this JSON into a single-line string:
	* Remove any line breaks and extra spaces. For example:
```json
{"type":"service_account","project_id":"your-project-id","private_key_id":"your-private-key-id","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBg...","client_email":"your-service-account@your-project-id.iam.gserviceaccount.com","client_id":"your-client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account@your-project-id.iam.gserviceaccount.com"}
```
4.  Escape special characters:
	* Any newline \n should be replaced with \\n, so it works as a single-line environment variable.


For further Google configuration please follow below link:
https://developers.google.com/drive/api/quickstart/nodejs