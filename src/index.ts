import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import { AppDataSource } from './data-source';


const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const app: Express = express();

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    app.use(cors({
      origin: allowedOrigins
    }));
    
    app.use(bodyParser.json());
    app.use(router);
    
    app.get('/', (req, res) => {
      res.send('Welcome to server');
    });
    
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    
  })
  .catch((error) => console.log(error));
