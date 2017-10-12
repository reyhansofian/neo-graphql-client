import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createNetworkInterface } from 'apollo-upload-client';
import 'tachyons';

import { Gallery, UploadImage } from './components';
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
      <Router history={browserHistory}>
        <Route path="/" component={Gallery} />
        <Route path="/upload" component={UploadImage} />
      </Router>
    </ApolloProvider>
  ),
  document.getElementById('root')
);

registerServiceWorker();

