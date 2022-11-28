import http, { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import event from 'events';

type HandlerFunc = (req: IncomingMessage, res: ServerResponse) => Promise<void>

const person: {lastName: string | string[] | undefined, name?: string | string[] | undefined}= {
    lastName: "Gevorgyan",
}

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
    person.name = req.headers.name;
    console.log("person =", person);
    res.end(person);
}

async function getRequestHandler(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const result = `${person.name} ${person.lastName}`;
    console.log("name =", result);
    res.end(result);
}

app.listen(3000);


