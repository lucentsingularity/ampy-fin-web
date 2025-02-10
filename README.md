This provides a simple web structure for reporting on AmpyFin

## Getting Started

## Create Env

You need to specify the MongoDB URI as an ENV variable.

This would usually be done by creating a `.env.local` file with a key

`MONGODB_URI='YOURMONGDBURI'`

@see `sample.env`

Then run your server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Releases

AmpyFin Web follows the same version as AmpyFin to ensure compatibility with any DB changes.

