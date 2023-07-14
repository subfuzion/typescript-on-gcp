# Set up your project

A Google Cloud project refers to the collection of related applications, physical cloud infrastructure, and other resources (such as secrets, container images, static assets, etc.) that you deploy on Google Cloud.

> Remember: You can deploy more than one application to the same Google Cloud project. This is particularly applicable to microservice projects.

Every time you want to create a new project, you'll follow the same steps:

1. Log in at the terminal
2. Create a project
3. Link the project to billing

### 1. Log in at the terminal

You might have several accounts, or your login has expired, or this is your first login. In any case, you can log in to your Google Cloud account from the terminal with the following command:

```
gcloud auth login
```

This will open a page using your system web browser. Confirm that the page is a link under https://accounts.google.com/ and authorize the Google Cloud SDK to be able to access your Google account.

After that, you can close the page. Back in your shell, you should see confirmation that you've logged in like this:

![gcloud auth login success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpodjeu4fafjy31ucob0.png)

Don't worry about setting a project now. You'll create a project in the next step and then use Terraform configuration to specify the project to use.

### 2. Create a Google Cloud project

> If you already have a specific Google Cloud project to use, you can skip this section.

Once you're logged in, you can create or specify an existing Google Cloud project to use and configure locally.

```
gcloud projects create my-amazing-demo-1
```

![gcloud projects create](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/owi5dg85dojdf4y0zquq.png)

> Note: If you're creating a project as part of an organization, you'll need to know the Folder ID that your project should be under. Discussing organization accounts is beyond this scope, but you can learn more [here](https://cloud.google.com/resource-manager/docs/creating-managing-folders). The command to create the project has an option for providing the Folder ID: `gcloud projects create [PROJECT_ID] --folder [FOLDER_ID]`.

### 3. Link the project to billing

> If billing has already been linked to an existing project, you can skip this section.

Once you've created the project, you must link it to a billing account.

You can find your billing account ID on [your billing accounts page](https://console.cloud.google.com/billing).

```
gcloud beta billing projects link my-amazing-demo-1 --billing-account 0X0X0X-0X0X0X-0X0X0X
```

![gcloud beta billing projects link](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qqorha9na0wmr1mdup2v.png)

> In the screenshot above, I have my billing account ID saved in a shell variable.

