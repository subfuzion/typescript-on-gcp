## Local Firestore Development

The Google Cloud Firestore emulator requires a Java 8+ JRE installed and on your system PATH.

If you need to install Java, you can get it from here: [https://adoptium.net/](https://adoptium.net/):

- To choose a specific version, navigatge to: [https://adoptium.net/temurin/releases/](https://adoptium.net/temurin/releases/)

- If you're on a Mac with an Apple Silicon M1 or M2 chip, choose the `aarch64` architecture

- Choose JRE instead of the full JDK package unless you plan to do Java development

Run the following commands in your shell:

```text
gcloud components install cloud-firestore-emulator
# or if already installed:
# gcloud components update
```

Choose the port you want to use for the Firestore emulator, for example `9999`, and export the `FIRESTORE_EMULATOR_HOST` environment variable:

```
export FIRESTORE_EMULATOR_HOST="localhost:9999"
```

Start the emulator:

```
gcloud emulators firestore start --host-port="$FIRESTORE_EMULATOR_HOST"
```

When the exported FIRESTORE_EMULATOR_HOST environment variable is set, the Firestore client will automatically use it to connect to the emulator.

Press `Ctrl-C` when you want to stop the Firestore emulator.

For more detail, see the docs for [Emulate Firestore locally](https://cloud.google.com/firestore/docs/emulator).
