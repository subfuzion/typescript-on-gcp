# Set up your machine

1. Install the Google Cloud CLI
2. Install Terraform

### 1. Install the Google Cloud CLI

While you might find that using the Google Cloud web [console](https://console.cloud.google.com/) or online [Cloud Shell](https://cloud.google.com/shell) environment meets your occasional needs, for professional work you generally want to [install the Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (`gcloud`) on your own system where presumably you already have the `bash` shell, `git`, and your favorite editor or IDE already set up.

After installing `gcloud`, you need to install the `beta` component as well (it will be used later to link billing to projects):

```
gcloud components install beta
```

Don't worry about installing any other components. For now, you'll only need the CLI so you can login and create projects using the terminal. You'll install Terraform (in the next step) for managing resources using YAML configuration instead of entering explicit `gcloud` commands.

### 2. Install Terraform

Follow these [instructions](https://developer.hashicorp.com/terraform/tutorials/gcp-get-started/install-cli?in=terraform%2Fgcp-get-started).
