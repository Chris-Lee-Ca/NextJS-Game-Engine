import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://lq0ls1yg.api.sanity.io/v2023-08-01/graphql/production/default",
    cache: new InMemoryCache(),
});

export default apolloClient;
