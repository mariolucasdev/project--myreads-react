import React, { Component } from 'react';
import './ListBooks.css';

export default class ListBooks extends Component {
  handleClick(book, shelf) {
    this.props.onUpdateShelf(book, shelf);
  }

  options = [
    { title: 'Currently Reading', value: 'currentlyReading' },
    { title: 'Want to Read', value: 'wantToRead' },
    { title: 'Read', value: 'read' },
    { title: 'None', value: 'none' }
  ];
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
                          backgroundImage: `url('${
                            b.imageLinks
                              ? b.imageLinks.thumbnail
                              : 'http://www.dcturbos.com.br/images/imagem-nao-disponivel.gif'
                          }')`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          {this.options.map(o => (
                            <option
                              key={o.value}
                              value={o.value}
                              onClick={() => this.handleClick(b, o.value)}
                            >
                              {o.value === b.shelf ? (
                                <span>&#x2714; {o.title}</span>
                              ) : (
                                <span>{o.title}</span>
                              )}
                            </option>
                          ))}
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
