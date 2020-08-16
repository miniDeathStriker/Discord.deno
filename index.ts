/// <reference path="./lib.deno.d.ts" />
import { WebSocket } from "./modules/deno-websocket/mod.ts"
import { Request } from "./modules/request/request.ts"
import EventEmitter from "./modules/events/mod.ts";

const BASE_URL = "https://discord.com/api";
export default BASE_URL;


export class Client extends EventEmitter {
    options = {};
    guilds = {}
    channels = {}
    users = {}
    token = ""
    headers = {
        "User-Agent": "Discord.deno (http://discorddeno.land, 0.0.1)",
        "Authorization": `Bot ${this.token}`
    }
    /**
     * 
     * @param { { disableMentions:boolean | fetchAllMembers:boolean } } options Client options
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
    }
}

let request = new Request();
let wss = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");