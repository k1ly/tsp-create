# tsp-create

`tsp-create` is a command-line interface (CLI) tool for quickly setting up a new TypeScript project from a predefined template.

## Installation

To install `tsp-create`, globally run:

```sh
npm install -g tsp-create
```

## Usage

### Creating a New Project

To create a new TypeScript project using `tsp-create`, execute the following command:

```sh
tsp create <project-name>
```

### Commands

After creating the project, navigate into its directory and install dependencies:

```sh
cd <project-name>
npm install
```

You can then use the following npm scripts to manage your project:

- **Build the project:**

  ```sh
  npm run build
  ```

- **Start the project:**

  ```sh
  npm run start
  ```

- **Start the project in development mode:**

  ```sh
  npm run start:dev
  ```

- **Start the project in production mode:**

  ```sh
  npm run start:prod
  ```

## License

This project is licensed under the MIT License
