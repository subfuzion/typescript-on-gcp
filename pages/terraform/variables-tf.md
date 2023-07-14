# variables.tf

You'll need a `variables.tf` file to declare the required input variables for your Terraform script.

```hcl
variable "project_id" {
  type        = string
  description = "The Google Cloud project ID."
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "The Google Cloud region to use."
}

variable "deployment_name" {
  type        = string
  description = "Identifier for this deployment (used in some resource names)."
  default     = "demo"
}

variable "app_image" {
  type        = string
  description = "Initial image to deploy to Cloud Run service."
  default     = "LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE"
}

variable "labels" {
  type        = map(string)
  description = "A set of key/value label to tag resources deployed by this solution."
  default     = {}
}
```
