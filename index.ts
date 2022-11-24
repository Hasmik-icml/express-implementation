import http, { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import event from 'events';

type HandlerFunc = (req: IncomingMessage, res: ServerResponse) => Promise<void>

// type Method = 'get' | 'post' | 'put';

// function methodHandler(method: Method, handler: HandlerFunc):  {
// }

class Server {
    private server: http.Server;
    private emmiter: event;

    constructor() {
        this.emmiter = new event(),
        this.server = http.createServer(this.requestHandler);
    }
    
    private requestHandler = (req: IncomingMessage, res: ServerResponse): void => {
        console.log(111111111,`${req.method}-${req.url}`);
        this.emmiter.emit(`${req.method}-${req.url}`, req, res);
    }
   
    get(url: string, handler: HandlerFunc) {
        console.log("get-url=", url);
        this.emmiter.on(`GET-${url}`, handler);
    }

    post(url: string, handler: HandlerFunc) {
        console.log("post-url=", url, `POST-${url}`);
        this.emmiter.on(`POST-${url}`, handler);
    }

    listen(port: number) {
        this.server.listen(port, () => {
            console.log("Server is running...");
        })
    }

}

const app = new Server();

app.get('/get', getRequestHandler);

app.post('/post', postRequestHandler);

async function postRequestHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const a = req.headers.name;
    console.log("aa==", a);
    res.end(a);
}

async function getRequestHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const b = req.headers.name;
    console.log("bb==", b);
    res.end(b);
}


app.listen(3000);


