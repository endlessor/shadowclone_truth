import React, { useState, useEffect } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, Observable } from "apollo-boost";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.scss";

import MainRoute from "./routes";
import { AUTH_TOKEN, persistor, apolloCache } from "./config";
import { ProgressSpinner } from "./components";

function App() {
  const [client, setClient] = useState(null);
  useEffect(() => {
    persistor.restore().then(() => {
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
        cache: apolloCache
      });

      setClient(client);
    });
  }, []);

  if (!client) return <ProgressSpinner />;
  return (
    <ApolloProvider client={client}>
      <div className="p-grid p-justify-center">
        <div className="p-col-12 p-sm-12 p-md-6">
          <MainRoute />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
