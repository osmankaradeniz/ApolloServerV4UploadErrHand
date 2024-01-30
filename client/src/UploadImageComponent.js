import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import React from 'react';
import gql from 'graphql-tag';


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://localhost:3001/graphql',
    headers: {
      "Apollo-Require-Preflight": "true",
    },
  }),
});



const UPLOAD = gql`
  mutation uploadImage($file: Upload!,$upload_path_name: String!) {
    uploadImage(file: $file,upload_path_name: $upload_path_name) {
       url
      filename
      mimetype
      encoding
    }
  }
`;

class App extends React.Component {
  state = {
    image: null
  };

  onImageChange = (event) => {
    console.log(event.target.files);

    this.setState({
      image: event.target.files[0]
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    client
      .mutate({
        mutation: UPLOAD,
        variables: {
          file: this.state.image,
          upload_path_name: 'images'
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <form onSubmit={this.onSubmit}>
          <input
            type="file"
            name="files"
            onChange={this.onImageChange}
            alt="image"
          />
          <br />
          <button type="submit">Send</button>
        </form>
      </ApolloProvider>
    );
  }
}

export default App;
