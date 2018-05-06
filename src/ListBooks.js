import React, { Component } from 'react';
import './ListBooks.css';

export default class ListBooks extends Component {
  handleClick(book, evt) {
    this.props.onUpdateShelf(book, evt.target.value);
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
                    {console.log(b)}
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
                            value="currentlyReading"
                            onClick={evt => this.handleClick(b, evt)}
                          >
                            Currently Reading
                          </option>
                          <option
                            value="wantToRead"
                            onClick={evt => this.handleClick(b, evt)}
                          >
                            Want to Read
                          </option>
                          <option
                            value="read"
                            onClick={evt => this.handleClick(b, evt)}
                          >
                            Read
                          </option>
                          <option
                            value="none"
                            onClick={evt => this.handleClick(b, evt)}
                          >
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
