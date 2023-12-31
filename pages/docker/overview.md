# Overview

Most cloud environments run your applications in containers. A container is
the term used to describe one or more related processes that are isolated by the
operating system from other processes running on a machine.

For the processes running in a container, it appears to them as if they have
exclusive use of all the machine resources. This is somewhat analogous to the
concept of a virtual machine, but where a virtual machine contains a complete
operating system and can take minutes to boot up, a container only contains
applications and their resources. Containers run on an already running operating
system (such as Linux) and effectively launch as quickly as other processes in
seconds or even milliseconds.

While regular processes are launched from executable files, containers are
launched from image files. Images are stored in repositories and are downloaded
and then cached on machines on demand.

You can think of an image as a kind of archive file (like a zipfile), but not
only do images encapsulate one more executable files, they also encapsulate all
the resources that are needed, such as configuration files, libraries, and any
other assets needed at runtime.

You can think of an image as something that contains the result of everything
you need to install and build on a brand new computer to make your application
work -- minus the core operating system (the kernel).

The final image that you use to launch a container is actually composed of many
image layers. Each layer is generated as the result of executing an instruction
in a particular file analogous to the steps you would take to install and build your
application on a brand new computer.

This particular file is a Dockerfile. Often this file can be automatically
generated by using something called a buildpack.

For Node.js applications, for example, a buildpack can generally build an image
as long as there is a `package.json` file with a npm `build` and `start` run
scripts. You'll see this in action later.

To correctly build an image for a Next.js app, however, you'll need a
Dockerfile.

In this section, you'll learn the details of a Dockerfile for basic Node.js
applications (even though you might not need it) and then you'll learn what it
takes to create a Dockerfile for a Next.js application.
