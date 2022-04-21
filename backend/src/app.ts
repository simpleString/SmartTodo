import 'dotenv/config'
import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';

import fastifyJwt from 'fastify-jwt';
import fastifySwagger from 'fastify-swagger';


export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(fastifySwagger, {routePrefix: '/docs', exposeRoute: true})
  fastify.register(fastifyJwt, {secret: process.env.JWT_SECRET!})


  
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {...opts, prefix: '/api'},
  })

};

export default app;
export { app }
