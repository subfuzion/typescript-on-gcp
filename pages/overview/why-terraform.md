# Why Terraform?

With Terraform, you can use YAML to configure:

- Cloud infrastructure resources (including compute and storage services).
- Cloud resources (such as Cloud Build and Cloud Deploy) for automating CI/CD pipelines.

This is known as _Infrastructure as Code_, and advantages include:

- Using a declarative approach to define an outcome that the Terraform engine
  will strive to achieve
- Tracking changes to configuration using version control

Full stack developers are generally already familiar with using a variety of
configuration files for managing various settings for their applications. A
typical sampling of these files might include:

- [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [next.config.ts](https://nextjs.org/docs/app/api-reference/next-config-js/runtime-configuration)
- [.eslintrc](https://eslint.org/docs/latest/use/configure/)
- [.editorconfig](https://editorconfig.org/)
- [launch.json](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)

Terraform adds a few more files to the developer's configuration repertoire, but
don't let this discourage you. This guide will walk you through the basics of
what you need to know to get up and running quickly. Once you become familiar
with Terraform, you'll appreciate the effort saved from trying to wrangle
infrastructure manually.
