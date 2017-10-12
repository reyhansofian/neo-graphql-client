import React from 'react';
import { graphql, gql } from 'react-apollo';

const UploadImage = graphql(gql`
  mutation updateGallery($images: [Upload!]!) {
    updateGallery(images: $images) {
      id
      name
      path
      type
      size
    }
  }
`)(({ mutate }) => {
  const handleChange = ({ target }) => {
    if (target.validity.valid) {
      mutate({
        variables: {
          images: target.files,
        },
      }).then(({ data }) => console.log('Mutation response:', data));
    }
  };

  return (
    <input
      type="file"
      accept="image/jpeg,image/png"
      multiple
      required
      onChange={handleChange}
    />
  );
});

export { UploadImage };
