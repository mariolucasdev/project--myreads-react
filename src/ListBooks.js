import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListBooks extends Component {
  render() {
    const { books, onUpdateShelf, title } = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>

          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map(b => (
                <li key={b.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url('${b.imageLinks.thumbnail}')`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          <option
                            onClick={onUpdateShelf(b, 'currentlyReading')}
                          >
                            Currently Reading
                          </option>
                          <option onClick={onUpdateShelf(b, 'wantToRead')}>
                            Want to Read
                          </option>
                          <option onClick={onUpdateShelf(b, 'read')}>
                            Read
                          </option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{b.title}</div>
                    <div className="book-authors">{b.author}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
