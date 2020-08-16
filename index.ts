/// <reference path="./lib.deno.d.ts" />
import { WebSocket } from "./modules/deno-websocket/mod.ts"
import { Request } from "./modules/request/request.ts"
import EventEmitter from "./modules/events/mod.ts";
import { heartBeat } from "./utils/heartbeat.ts"
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
            // this.ws.send(JSON.stringify({
            //     op: 10
            // }))
            this.ws.send(JSON.stringify({
                    op: 2,
                    d: {
                      token: this.token,
                      properties: {
                        $os: "Windows",
                        $browser: "Discord.deno",
                        $device: "Discord.deno"
                      }
                    }
            }))
        })
    }
}

const client = new Client({disableMentions:false})
client.ws.on("message", (msg:any) => {
    let data = JSON.parse(msg)
    console.log(data.op)
    if(data.op !== 10 && data.op !== 11)return
    console.log(data)
    if(data.op === 10)heartBeat(data.d.heartbeat_interval || 41250, client)
    console.log(data.op)
})
client.login("NzQzNDAwNTEwMTg2NTg2MjIy.XzUHrQ.iKSdOlyTfYPVxqphO79N41SQlOI")