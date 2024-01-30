import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schema/schema.js";
import { ApolloServer } from "@apollo/server";
import pkg from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";


const { json } = pkg;

const app = express();

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });


const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    uploads: false,
    csrfPrevention: true,
    cache: 'bounded',
});

await server.start();


app.use("/images", express.static(process.env.SERVER_STATIC_PATH + "/images")); // static dosyanın erişime açtığımız middleware
app.use(graphqlUploadExpress({ maxFileSize: (process.env.SERVER_UPLOAD_MAX_SIZE * 1024 * 1024), maxFiles: 1 })) // graphql-upload middleware


app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => ({
            req: req,
            res: res,
            authHeaders: req.headers.authorization,
            clientIp: req.ip,
        }),
    }),
);



app.use('/', (req, res) => {
    res.json("OK");
})


httpServer.listen({ port: 3001 });

console.log(`🚀 Server ready at http://localhost:3001/graphql`);
