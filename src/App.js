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
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf);
    this.getBooks();
  };

  render() {
    const { books } = this.state;
    const rFilter = books.filter(b => b.shelf === 'read');
    const wFilter = books.filter(b => b.shelf === 'wantToRead');
    const cFilter = books.filter(b => b.shelf === 'currentlyReading');

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
                <ListBooks
                  title="Currently Reading"
                  books={cFilter}
                  onUpdateShelf={(b, s) => {
                    this.updateBook(b, s);
                    history.push('/');
                  }}
                />
                <ListBooks
                  title="Want to Read"
                  books={wFilter}
                  onUpdateShelf={(b, s) => {
                    this.updateBook(b, s);
                    history.push('/');
                  }}
                />
                <ListBooks
                  title="Read"
                  books={rFilter}
                  onUpdateShelf={(b, s) => {
                    this.updateBook(b, s);
                    history.push('/');
                  }}
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
