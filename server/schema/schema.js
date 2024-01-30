import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";




/* TypeDefs - START */
import { utils_TypeDef } from '../typeDefs/utils_TypeDef.js';


export const typeDefs = mergeTypeDefs([
    utils_TypeDef,
]);
/* TypeDefs - END */




/* Resolvers - START */
import { utils_Resolver } from '../resolvers/utils_Resolver.js';


export const resolvers = mergeResolvers([
    utils_Resolver
]);

/* Resolvers - END */