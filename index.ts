/// <reference path="./lib.deno.d.ts" />
import { WebSocket } from "./modules/deno-websocket/mod.ts"
import { Request } from "./modules/request/request.ts"
import EventEmitter from "/modules/events/mod.ts";

class Client extends EventEmitter {
    options = null;
    /**
     * 
     * @param { { disableMentions:boolean | fetchAllMembers:boolean } } options Client options
     */
    constructor(options:object){
        super(options)
            this.options = options;
    }
    /**
     * 
     * @param {string} token Discord bot token
     */
    login(token:string){
        
    }
}