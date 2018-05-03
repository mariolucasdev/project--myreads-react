import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    alert(book, shelf);
  };

  render() {
    const rFilter = this.state.books.filter(b => b.shelf === 'read');
    const wFilter = this.state.books.filter(b => b.shelf === 'wantToRead');
    const cFilter = this.state.books.filter(
      b => b.shelf === 'currentlyReading'
    );

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                <ListBooks
                  title="Currently Reading"
                  books={cFilter}
                  onUpdateShelf={(b, s) => this.updateBook(b, s)}
                />
                <ListBooks
                  title="Want to Read"
                  books={wFilter}
                  onUpdateShelf={(b, s) => this.updateBook(b, s)}
                />
                <ListBooks
                  title="Read"
                  books={rFilter}
                  onUpdateShelf={(b, s) => this.updateBook(b, s)}
                />
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => <SearchBooks books={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
