import express, {Application} from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import {createServer} from 'http'; 
import {Server as ServerSocket} from 'socket.io';

import {routerAuth, routerCategory, routerProduct, routerUser, routerSearch, routerUpload} from '../routes';
import { dbConnection } from '../db/config';
import { socketController } from '../sockets/controller';

    class Server  {
    private app: Application ;
    private port: string | undefined; 
    private server = createServer();
    private io: ServerSocket;

    // path for routes
    private routePaths = {
        auth: '/api/auth',
        users: '/api/users',
        categories: '/api/categories',
        products: '/api/products',
        uploads: '/api/uploads',
        search: '/api/search',
        upload: '/api/upload'
    }

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        // Creando server Socket
        this.io = new ServerSocket(this.server);

        //  Conectar DB
        this.databaseConnect();

        // middlewares
        this.middlewares();

        // routes
        this.routes();

        // Sockets
        this.sockets();

    }

    async databaseConnect(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Parsing body
        this.app.use(express.json());

        // Static page
        this.app.use(express.static('dest/public'))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        //TODO: upload
        this.app.use(this.routePaths.auth, routerAuth);
        this.app.use(this.routePaths.users, routerUser);
        this.app.use(this.routePaths.categories, routerCategory);
        this.app.use(this.routePaths.products, routerProduct);
        this.app.use(this.routePaths.search, routerSearch);
        this.app.use(this.routePaths.upload, routerUpload);
        this.app.use('/register', express.static('dest/public/register.html'));
    }

    sockets(){
        this.io.on("connection", (socket)=>socketController(socket, this.io));
    }


    listen(){
        this.server.listen(this.port, ()=>{
            console.log(`This Server is running in port ${this.port}`);
        });
    }

}

export default Server;
