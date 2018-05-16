import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

export default class SearchBooks extends Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      searchBooks: []
    };
  }
  
  searchBooks = value => {
    BooksAPI.search(value.trim())
      .then(res => {
        if(res && !res.error){
          const booksResults = res.map(book => {
            let bookFind = this.props.books.find(b => b.id === book.id);
            if(bookFind){
              book.shelf = bookFind.shelf;
            } else {
              book.shelf = "none";
            }
            return book;
          });
          this.setState({ searchBooks : booksResults})
        }
    });
  };
  
  handleChange = value => {
    this.setState({ search: value });
    this.searchBooks(this.state.search);
  };
  
  handleClick = (book, shelf) => {
    this.props.onUpdateShelf(book, shelf);
  };
  
  render() {
    const { search, searchBooks } = this.state;
    
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
