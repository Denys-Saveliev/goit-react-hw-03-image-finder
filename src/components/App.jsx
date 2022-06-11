import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import SearchForm from './SearchForm';
import ImageInfo from './ImageInfo';

export default class App extends Component {
  state = {
    search: '',
  };

  handleFormSubmit = search => {
    this.setState({ search });
  };

  render() {
    return (
      <>
        <Searchbar>
          <SearchForm onSubmit={this.handleFormSubmit} />
        </Searchbar>
        <ToastContainer style={{ justifyContent: 'center' }} />
        <ImageInfo searchQuery={this.state.search} />
      </>
    );
  }
}
