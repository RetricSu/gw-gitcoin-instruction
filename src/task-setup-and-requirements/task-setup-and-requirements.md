# Task Setup and Requirements

This page describes the requirements for participating on the tasks, and also provides guides and links to setup your environment properly.

## Supported Environments

The following operating systems are officially supported. Other operating systems may also be compatible, but have not officially been tested for compability by our teams.

Throughout our demos and walkthroughs, Ubuntu Linux 20.04 is used. This is the preferred platform.

- [Ubuntu Linux 20.04](https://ubuntu.com/) (Desktop or Server edition)
- [MacOS](https://www.apple.com/macos/) (Big Sur 11.0+)
- [Windows 10](https://www.microsoft.com/en-us/windows) + [WSL2](https://docs.microsoft.com/en-us/windows/wsl/about) (Ubuntu 20.04 virtualized)

## Prerequisite Software

- Build Tools
- [Git](https://git-scm.com/)
- [Node.js 14+](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/)
- [Docker](https://docs.docker.com/get-docker/)

## Setup Instructions

### Ubuntu 20.04 (Native or Windows 10 + WSL2)

#### Build Tools + Git

```sh
sudo apt install build-essential git
```

#### Node.js

The default version of Node.js included with Ubuntu 20.04 is v10.19.0, which is far behind the latest version.

For full compatibility, a newer version is needed. This can be done using the available Node.js installation instructions for Ubuntu, or by using NVM (Node Version Manager).

- [Node.js Install](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- [NVM Install](https://github.com/nvm-sh/nvm#installing-and-updating)

#### Yarn

Yarn can easily be installed using NPM once Node.js is installed.

```sh
npm i -g yarn
```

#### Docker

Docker will be used for running Solidity compiler to compile smart-contracts. [You can find informations how to install it on official Docker website.](https://docs.docker.com/get-docker/) If you're using Windows + Windows Subsystem For Linux it will be the easiest if you download and install official "Docker for Windows" desktop application. It makes using Docker easy thanks to graphical interface.

### MacOS (10.13+)

#### Build Tools + Git

Download and install the Xcode Command Line Tools from [developer.apple.com](https://developer.apple.com/library/archive/technotes/tn2339/).

#### Node.js

Node.js provides a MacOS installer which can be found on the [Node.js Download page](https://nodejs.org/en/download/).

#### Yarn

Yarn can easily be installed using NPM once Node.js is installed.

```sh
npm i -g yarn
```

#### Docker

Docker will be used for running Solidity compiler to compile smart-contracts. [You can find informations how to install it on official Docker website.](https://docs.docker.com/get-docker/)
