// Configuration
import Config from 'config';
import Express from 'express';
import Mongoose, { ConnectionOptions } from 'mongoose';
import Cors from 'cors';
import Helmet from 'helmet';
import router from '../routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs';

type MongoDbConfig = {
	dbConnectionString: string;	
	dbName: string;
};

type MongoDbCred = {
	dbUser: string;
	dbPassword: string;
};

export default class ExpressConfiguration {
  public app: Express.Application;
	private dbConfig: MongoDbConfig;
	public pathname: string;	

  constructor() {
    this.dbConfig = {			
      dbName: process.env.DB_NAME || Config.get('dbName'),
      dbConnectionString: process.env.DB_CONNECTION_STRING || Config.get('dbEndpoint')
    };		
    this.pathname = `/api${Config.get('pathname')}`; // /api/mytodo/v1
    this.app = Express();
    this.startup();
    this.dbConnect();  // connect to MongoDB
  }

  // get app configuration
  public get(field: string): string {
  	return Config.get(field);
  }

  private dbConnect() { 
		const { dbName, dbConnectionString } = this.dbConfig;		
		let options: ConnectionOptions = { 
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			useFindAndModify: false,
		};
				
		const dbPath = dbConnectionString.split('?');
		let connection = `${dbPath[0]}${dbName}`;
			
		Mongoose.connect(connection, options)
			.then(() => { 
				const message = `Connected to mongodb successfully ...`;
				console.log(`${message}`);
			})
			.catch((error:Error) => { 
				const message = `Connection to mongodb failed!`;
				console.log(`${message}`);
			});
  }

  private startup() {
		this.app.use(Cors());		
		this.app.use(Express.json());
		this.app.use(Express.urlencoded({extended: true}));
		this.app.use(Helmet());	
		this.app.set('etag', 'strong'); 

    this.app.get('/swagger', (req, res) => { // redirect to swagger
      res.redirect(`${this.pathname}/v1-docs`);
    });

    const options = {
      swaggerOptions: {
      validatorUrl: null
      }
    };

    this.app.use(`${this.pathname}/v1`, router); 	

    this.app.use(`${this.pathname}/v1-docs`, 
				swaggerUi.serve, 
				swaggerUi.setup(swaggerDocument(), options));
  }
}

