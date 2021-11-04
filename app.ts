import dotenv from 'dotenv';
import {Server}  from './models';
dotenv.config();


const server:Server = new Server();

//Launching server
server.listen();