# Midi Output

> From socket signals to midi out!

## Setup

### Prereqs

- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [Typescript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/guides/installation/)

### Install Node Modules

```
npm install
```

## Development Flow

1. Write some code!
	- Edit files under `src`
	- Everything is Typescript!
	- `index.ts` is the starting script.
2. `tsc`
	- This creates a compiled `.js` file in `dest/` for each `.ts` file in `src/`.
	- aka: `src/*.ts` ➡️ `dest/*.js`
	- See [tsconfig.json](./tsconfig.json) for more info
3. `npm run dev`
	- Runs `node dist/index.js`
4. `npm webpack`
	- Creates `prod/index.js`
	- aka `dest/*.js` ➡️ `prod/index.js`
5. `npm run start`
	- Runs `node prod/index.js`
