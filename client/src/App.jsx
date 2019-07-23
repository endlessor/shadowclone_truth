import React, { useState, useEffect } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { persistCache } from "apollo-cache-persist";
import { ProgressSpinner } from "primereact/progressspinner";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";

import MainRoute from "./routes";
import { cacheResolvers } from "./config/graphql";

function App() {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const cache = new InMemoryCache({
      cacheRedirects: cacheResolvers
    });

    persistCache({ cache, storage: localStorage }).then(() => {
      const client = new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        cache
      });

      setClient(client);
    });
  }, []);
  if (!client) return <ProgressSpinner />;
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MainRoute />
      </div>
    </ApolloProvider>
  );
}

export default App;
