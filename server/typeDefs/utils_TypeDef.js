import gql from "graphql-tag";


export const utils_TypeDef = gql`
scalar Upload

type File {
   url: String
   filename: String
   mimetype: String
   encoding: String
}

type Mutation {
   uploadImage(file: Upload!, upload_path_name: String!): File
}

type Query {
   hello: String
}

`;