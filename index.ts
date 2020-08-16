/// <reference path="./lib.deno.d.ts" />
import { WebSocket } from "./modules/deno-websocket/mod.ts"
import { Request } from "./modules/request/request.ts"
import EventEmitter from "./modules/events/mod.ts";

export class Client extends EventEmitter {
    options = {};
    guilds = {}
    channels = {}
    users = {}
    token = ""
    BASE_URL = "https://discord.com/api/v6";
    BASE_WS = "wss://gateway.discord.gg/?v=6&encoding=json";
    ws = new WebSocket(this.BASE_WS)
    headers = {
        "User-Agent": "Discord.deno (http://discorddeno.land, 0.0.1)",
        "Authorization": `Bot ${this.token}`
    }
    /**
     * 
     * @param { { disableMentions:boolean | fetchAllMembers:boolean | intents: []("" | "" | "ALL") } } options Client options
     */
    constructor(options:object){
        super()
            this.options = options;
    }
    /**
     * 
     * @param {string} token Discord bot token
     */
    login(token:string){
        this.token = token

        this.ws.on("open", () => {
            this.ws.send(JSON.stringify({
                op: 10,
                d: {
                    heartbeat_interval: 45000
                }
            }))
            
        })
    }
}