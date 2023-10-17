# hexctf

When updating database, migrate with:
```
npx prisma migrate
```

View database table contents with:
```
npx prisma studio
```

Run server (live) with:
```
npm run dev
```
Then press `o` to open in browser.

With the `npm run dev` press `q` to quit and `r` to restart server.

Use Babel to convert seed.ts to seed.js to avoid errors when trying to run the seed script:

```
npm install --save-dev @babel/core @babel/cli @babel/preset-typescript
```
