import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const API = {
    apiURL: 'https://api.unsplash.com',
    client_id: ''
}
class App extends Component {
  state = {
    title: 'React Image Search',
    searchTerm: '',
    page: 1,
    photos: [],
    loading: false
  };

  loadItems = (searchTerm) => {
    const { page } = this.state;
    const url = `${API.apiURL}/search/photos?page=${page}&query=${searchTerm}?&client_id=${API.client_id}`;
    axios.get(url).then((res) => {
      console.log(res);
      this.setState({
        photos: res.data.results,
        loading: false
      });
    });
  };

  searchTermChanged = (event) => {
    console.log(event.target.value);
    this.setState({
      searchTerm: event.target.value,
    });
  }

  formSubmitted = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      images: []
    });
    this.loadItems(this.state.searchTerm)
  }
 
  render() {
    const { title, searchTerm, loading, photos } = this.state
    return (
      <div className="container">
        <div className="twelve columns">
          <h1>{title}</h1>
          <form onSubmit={(event) => this.formSubmitted(event)}>
            <label htmlFor="searchTerm">Search Term</label>
            <input
              className="u-full-width"
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={searchTerm}
              onChange={this.searchTermChanged}
            />
            <button type="submit">Search</button>
          </form>
          {loading ? <img src="https://i.imgur.com/LVHmLnb.gif" alt="Loading icon" /> : ''}
          <section className="images">
            {photos.map(photo => {
              return <img key={photo.id} src={photo.urls.full} alt={photo.alt_description} />
            })}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
