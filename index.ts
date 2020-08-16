/// <reference path="./lib.deno.d.ts" />
import { WebSocket } from "./modules/deno-websocket/mod.ts";
import { Request } from "./modules/request/request.ts";
import EventEmitter from "./modules/events/mod.ts";
import { heartBeat } from "./utils/heartbeat.ts";
import { ev } from "./structures/events/main.ts";

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
                      },
                      compress: true,
                      presence: {
                          game: {
                              name: "Mini code Discord.deno",
                              type: 3
                          }
                      },
                      status: "dnd"
                    }
            }))
            this.ws.on("message", (msg:any) => {
                let data = JSON.parse(msg)
                if(data.op === 10)return heartBeat(data.d.heartbeat_interval || 41250, this)
                if(data.op === 0){
                    let event = snakeToPascal(data.t.toLowerCase());
                    try{
                        ev.emit(event)
                    }catch(e){ return }
                }
            })
            this.ws.on("close", (d:any,d2:any) => {
                console.log("Websocket Connection closed: " + d)
            })
            this.ws.on("error", (e:any) => {
                console.log("Websocket Connection error: "+ e)
            })
        })
    }
}

const client = new Client({});

client.login("NzQzNDAwNTEwMTg2NTg2MjIy.XzUHrQ.J3VZ6YftkSkzYS5O4KSg0o-gWyQ")

const snakeToPascal = (string:string) => {
    return string.split("/")
      .map(snake => snake.split("_")
        .map(substr => substr.charAt(0)
          .toUpperCase() +
          substr.slice(1))
        .join(""))
      .join("/");
  };
