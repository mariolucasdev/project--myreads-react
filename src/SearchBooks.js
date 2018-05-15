import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

export default class SearchBooks extends Component {
  state = {
    search: '',
    searchBooks: []
  };

  searchBooks = value => {
    if (value) {
      BooksAPI.search(value.trim()).then(res => {
        if (res && res.error) {
        this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: res });
        }
      });
    }
  };
  
  handleChange = value => {
    this.setState({ search: value });
    this.searchBooks(this.state.search);
  };
  
  handleClick = (book, shelf) => {
    this.props.onUpdateShelf(book, shelf);
  };
  
  filterBooks = (b) => b.map(b => b.shelf="none");
  
  render() {
    const { search, searchBooks } = this.state;
    
    this.filterBooks(searchBooks);
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
              value={search}
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grind">
            {search.trim() !== '' && (
              <ListBooks
                title={`${searchBooks.length} resultado(s) para "${search}"`}
                books={searchBooks}
                onUpdateShelf={this.handleClick}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
