import ExpressConfiguration from './config/express.config';

const port = process.env.PORT || 5000;
const config = new ExpressConfiguration();

const server = config.app.listen(port,
  () => console.log(`${config.get('name')} listening on port ${port}...`)
);

export default server;