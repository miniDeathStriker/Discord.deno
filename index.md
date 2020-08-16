## Discord.deno

Discord.deno is a wrapper for the [discord API](https://discord.com/developers/docs) Using and made for the Deno runtime

Aiming to keep a similar syntax to the well known Discord.js<br>
Join us on [discord!](https://discord.gg/UjvN7Yg)

### Example

Here is a basic bot example made using Discord.deno

```ts
import { Client } from "https://deno.land/x/discorddeno@VERSION_HERE/index.ts"
let client = new Client( { disableMentions: true } );

client.on("message", (message) => {
  console.log(message);
}

client.login(TOKEN);
```

More info coming soon!
