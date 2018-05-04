import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

export default class SearchBooks extends Component {
  state = {
    books: [],
    query: ''
  };

  handleChange = value => {
    BooksAPI.search(value).then(res => this.setState({ books: res }));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.search}
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <ListBooks books={this.state.books} />
          </ol>
        </div>
      </div>
    );
  }
}
