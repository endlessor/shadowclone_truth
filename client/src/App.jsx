import React, { useState, useEffect } from "react";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache, ApolloLink, Observable } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { persistCache } from "apollo-cache-persist";
import { ProgressSpinner } from "primereact/progressspinner";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";

import MainRoute from "./routes";
import { cacheResolvers, AUTH_TOKEN } from "./config";

function App() {
  const [client, setClient] = useState(null);
  useEffect(() => {
    const cache = new InMemoryCache({
      cacheRedirects: cacheResolvers
    });

    persistCache({ cache, storage: localStorage }).then(() => {
      const request = operation => {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (token) {
          operation.setContext({
            headers: {
              authorization: `Bearer ${token}`
            }
          });
        }
      };
      const requestLink = new ApolloLink(
        (operation, forward) =>
          new Observable(observer => {
            let handle;
            Promise.resolve(operation)
              .then(oper => request(oper))
              .then(() => {
                handle = forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                });
              })
              .catch(observer.error.bind(observer));

            return () => {
              if (handle) handle.unsubscribe();
            };
          })
      );
      const client = new ApolloClient({
        link: ApolloLink.from([
          requestLink,
          createUploadLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })
        ]),
        cache
      });

      setClient(client);
    });
  }, []);

  if (!client) return <ProgressSpinner />;
  return (
    <ApolloProvider client={client}>
      <div className="p-grid p-justify-center">
        <MainRoute />
      </div>
    </ApolloProvider>
  );
}

export default App;
