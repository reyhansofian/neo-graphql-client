import React from 'react';
import { Link } from 'react-router';
import { graphql, gql } from 'react-apollo';

import { Loading, Error } from './index';

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

const processPath = path => path.replace('public/uploads', 'gallery');

class _Gallery extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }

    if (this.props.data.error) {
      return <Error error={this.props.data.error} />;
    }

    return (
      <div className="w-100 flex justify-center">
        <Link to="/upload" className="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">
          + Upload Image
        </Link>
        <article className="w-100">
          <h2 className="f3 fw4 pa3 mv0">Albums</h2>
          <div className="cf pa2">
            {this.props.data.gallery.map(image => (
              <div className="fl w-50 w-25-m w-20-l pa2">
                <div className="db link dim tc">
                  <img src={`${process.env.REACT_APP_GRAPHQL_URL}/${processPath(image.path)}`} alt={image.name} className="w-100 db outline black-10" />
                  <dl className="mt2 f6 lh-copy">
                    <dt className="clip">Image Name</dt>
                    <dd className="ml0 black truncate w-100">{image.name}</dd>
                    <dt className="clip">Image Size</dt>
                    <dd className="ml0 gray truncate w-100">{image.size}</dd>
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

const Gallery = graphql(getGallery)(_Gallery);

export { Gallery };
