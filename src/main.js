import program from 'commander'
import Server from './server'

// console.log(commander);
program
    .option('-p, --port <val>', 'set http-server port')
    .parse(process.argv);

let config = {
    port: 8080
};

Object.assign(config, program)

let server = new Server(config);
server.start();