import React from 'react';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

export default class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    this.getBooks();
  };

  filter = booksState => this.state.books.filter(b => b.shelf === booksState);

  categories = () => [
    { title: 'Currently Reading', books: this.filter('currentlyReading') },
    { title: 'Want to Read', books: this.filter('wantToRead') },
    { title: 'Read', books: this.filter('read') }
  ];

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                {this.categories().map(c => (
                  <ListBooks
                    key={c.title}
                    {...c}
                    onUpdateShelf={this.updateBook}
                  />
                ))}
              </div>

              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              books={this.state.books}
              onUpdateShelf={() => {
                this.updateBook();
              }}
            />
          )}
        />
      </div>
    );
  }
}
