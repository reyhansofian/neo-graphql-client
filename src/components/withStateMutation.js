import React from 'react';

const withStateMutation = ({ name = 'mutate' } = {}) => WrappedComponent => class extends React.Component {
    state = { loading: false, error: null, result: null };

    loadingProperty = `${name}Loading`;
    errorProperty = `${name}Error`;
    resultProperty = `${name}Result`;

    handleMutation = (options) => {
      this.setState({
        loading: true,
        error: null,
        result: null,
      });

      return this.props[name](options)
        .then((result) => {
          this.setState({
            loading: false,
            error: null,
            result,
          });
        })
        .catch((err) => {
          this.setState({
            loading: false,
            error: err,
            result: null,
          });
        });
    }

    render() {
      const props = {
        ...this.props,
        [name]: this.handleMutation,
        [this.loadingProperty]: this.state.loading,
        [this.errorProperty]: this.state.error,
        [this.resultProperty]: this.state.result,
      };

      return <WrappedComponent {...props} />;
    }
};

export default withStateMutation;
