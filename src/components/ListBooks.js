import React, { Component } from 'react';
import './ListBooks.css';

export default class ListBooks extends Component {

  // Evento que é acionado ao selecionar uma opção para mover o livro de estante que dispara chamando uma função está no App.js que foi passar como prop para este componente filho
  handleClick(book, shelf) {
    this.props.onUpdateShelf(book, shelf);
  }

  // Criado o objeto de opções para não ser necessário repitilo
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
                              : ''
                          }')`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select value={b.shelf} onChange={e => this.handleClick(b, e.target.value)}>
                          <option value="none" disabled>
                            Move to...
                          </option>
                          {this.options.map(o => (
                            <option
                              key={o.value}
                              value={o.value}
                            >
                              {o.value === b.shelf ? (
                                <span> &#x2714; {o.title} </span>
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
