import React, { Component } from 'react';
import Book from './Book';

export default class ListBooks extends Component {
  render() {
    console.log(this.props.books);
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map(book => <Book info={book} />)}
        </ol>
      </div>
    );
  }
}
