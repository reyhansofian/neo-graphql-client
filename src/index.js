import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createNetworkInterface } from 'apollo-upload-client';
import 'tachyons';

import { Gallery } from './components';
import { graphqlUrl } from './utils';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: `${graphqlUrl}/graphql`,
});

const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render(
  (
    <ApolloProvider client={client}>
      <Gallery />
    </ApolloProvider>
  ),
  document.getElementById('root')
);

registerServiceWorker();

