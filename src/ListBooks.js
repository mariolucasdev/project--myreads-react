import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';

export default class ListBooks extends Component {
  render() {
    const { books } = this.props;

    const read = books.filter(books => books.shelf === 'read');
    const currently = books.filter(books => books.shelf === 'currentlyReading');
    const want = books.filter(books => books.shelf === 'wantToRead');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>

              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currently.map(b => <Book key={b.id} info={b} />)}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>

              <div className="bookshelf-books">
                <ol className="books-grid">
                  {want.map(b => <Book key={b.id} info={b} />)}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>

              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map(b => <Book key={b.id} info={b} />)}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
