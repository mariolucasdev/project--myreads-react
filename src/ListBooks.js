import React, { Component } from 'react';
import './ListBooks.css';

export default class ListBooks extends Component {
  handleClick(book, shelf) {
    this.props.onUpdateShelf(book, shelf);
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>

          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map(b => (
                <li key={b.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url('${b.imageLinks &&
                            b.imageLinks.thumbnail}')`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option
                            onClick={() =>
                              this.handleClick(b, 'currentlyReading')
                            }
                          >
                            Currently Reading
                          </option>
                          <option
                            onClick={() => this.handleClick(b, 'wantToRead')}
                          >
                            Want to Read
                          </option>
                          <option onClick={() => this.handleClick(b, 'read')}>
                            Read
                          </option>
                          <option onClick={() => this.handleClick(b, 'none')}>
                            None
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{b.title}</div>
                    <div className="book-authors">
                      {b.authors && b.authors.map(author => author)}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
