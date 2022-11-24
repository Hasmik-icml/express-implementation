import http, { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import event from 'events';


// const emmiter = new event();

type HandlerFunc = (req: ClientRequest, res: ServerResponse) => Promise<void>

type Method = 'get' | 'post' | 'put';

// function methodHandler(method: Method, handler: HandlerFunc):  {
// }

class Server {
    private server: http.Server;
    private emmiter: event;
    lastName: string | undefined | string[]; // 

    constructor() {
            this.lastName = "Gevorgyan",
            this.emmiter = new event(),
            this.server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
                console.log(1111111111111, req.url);
                console.log(22222222222222, req.headers);
                console.log(33333333333333, req.method);

                // emmiter.emit(req, req);I
                if (req.method === 'GET') {
                    console.log("THIS IS GET REQUEST");



                    this.emmiter.emit(req.url || '', req, res);
                }

                if (req.method === 'POST') {
                    console.log('THIS IS POST REQUEST');
                    console.log("name === ", req.headers.name);

                    // this.lastName || [] || '' = this.lastName + req.headers.name;// verevy greci
                    this.lastName = `${this.lastName} ${req.headers.name}`; //+ ov chstacvec

                    this.emmiter.emit(req.url || '', req, res);
                }
            });

    }


    get(url: string, handler: HandlerFunc) {

        console.log("get-url=", url);
        this.emmiter.on(url, handler);
    }

    post(url: string, handler: HandlerFunc) {

        console.log("post-url=", url);
        this.emmiter.on(url, handler);
    }

    listen(port: number) {
        this.server.listen(port, () => {
            console.log("Server is running...");
        })
    }
}

const app = new Server();

app.get('/get', async (req: ClientRequest, res: ServerResponse): Promise<void> => {
    res.end("ok get");
});

app.post('/post', async (req: ClientRequest, res: ServerResponse): Promise<void> => {
    res.end(app.lastName);
});

app.listen(3000);




