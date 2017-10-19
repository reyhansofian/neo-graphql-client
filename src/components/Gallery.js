import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

import withStateMutation from './withStateMutation';
import { Loading, Error } from './index';
import { graphqlUrl, processPath, formatBytes } from '../utils';

const getGallery = gql`
  query getGallery {
    gallery {
      id
      name
      size
      path
      type
    }
  }
`;

const upload = gql`
  mutation updateGallery($images: [Upload!]!) {
    updateGallery(images: $images) {
      id
      name
      path
      type
      size
    }
  }
`;

class _Gallery extends React.Component {
  static defaultProps = {
    mutateLoading: false,
    data: {
      loading: false,
      gallery: [],
    },
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      gallery: PropTypes.array,
    }),
    mutate: PropTypes.func.isRequired,
    mutateLoading: PropTypes.bool,
  }

  handleChange = ({ target }) => {
    if (target.validity.valid) {
      this.props.mutate({
        variables: {
          images: target.files,
        },
      }).then(data => console.log('Mutation response:', this.props));
    }
  };

  render() {
    if (this.props.data.error) {
      return <Error error={this.props.data.error} />;
    }

    return (
      <div className="w-100 flex justify-center">
        <div className="fileUpload fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">
          <span>+ Upload Image</span>
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="upload"
            multiple
            required
            onChange={this.handleChange}
          />
        </div>
        <article className="w-100">
          <h2 className="f3 fw4 pa3 mv0">Albums</h2>
          <div className="cf pa2">
            {(this.props.data.loading || this.props.mutateLoading)
              ? <Loading />
              : this.props.data.gallery.map(image => (
                <div className="fl w-50 w-25-m w-20-l pa2" key={image.id}>
                  <div className="db link dim tc">
                    <img src={`${graphqlUrl}/${processPath(image.path)}`} alt={image.name} className="w-100 db outline black-10" />
                    <dl className="mt2 f6 lh-copy">
                      <dt className="clip">Image Name</dt>
                      <dd className="ml0 black truncate w-100">{image.name}</dd>
                      <dt className="clip">Image Size</dt>
                      <dd className="ml0 gray truncate w-100">{formatBytes(image.size)}</dd>
                      <dt className="clip">Image Type</dt>
                      <dd className="ml0 gray truncate w-100">{image.type}</dd>
                    </dl>
                  </div>
                </div>
            ))}
          </div>
        </article>
      </div>
    );
  }
}

const Gallery = compose(
  graphql(getGallery),
  graphql(upload),
  withStateMutation()
)(_Gallery);

export { Gallery };
