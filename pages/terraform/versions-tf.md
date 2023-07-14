# versions.tf

You'll need a `versions.tf` file that adds the Google Cloud provider.

At the time of writing this, [the current version of Terraform](https://developer.hashicorp.com/terraform/downloads) is `v1.5.2` and the [current Google Cloud provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs) is `v4.72.1`.

```yaml
terraform {
  required_version = ">= 0.13"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.72.1, < 5.0"
    }
}
```
