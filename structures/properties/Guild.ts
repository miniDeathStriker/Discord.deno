import { Client } from "../../index.ts"

export class Guild{
    client:Client;
    constructor(data:object, client:Client){
        this.client = client
    }
}