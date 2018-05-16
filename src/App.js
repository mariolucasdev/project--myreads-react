import React from 'react';
import { Route, Link } from 'react-router-dom';

import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './utils/BooksAPI';

import './App.css';

export default class BooksApp extends React.Component {
  state = {
    books: []
  };

  // Inicializa e Aplicação dando um getAll na API usando a funcão getBooks como auxiliar
  componentDidMount() {
    this.getBooks();
  }

  // Método de requisição a API resposável por trazer todos os livros do banco de dados 
  getBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };

  // Método de atualização de estante do livro como promisse que após atualização do dados faz a requisição para trazer os dados atualizados para renderizar e mudar o livro de estante
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(this.getBooks);
  };

  // Filtro para definir os livros para suas respectivas estantes
  filter = booksState => this.state.books.filter(b => b.shelf === booksState);

  // Metodo que retorna um objeto com dados de estante e metodo de filtro de livros a idéia desse método é evitar a repetição de código pois sem ele teriamos que ter três estantes no render
  categories = () => [
    { title: 'Currently Reading', books: this.filter('currentlyReading') },
    { title: 'Want to Read', books: this.filter('wantToRead') },
    { title: 'Read', books: this.filter('read') }
  ];

  render() {

    const { books } = this.state;

    return (
      <div className="app">
        {/* Rota principal da aplicação */}
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              <div className="list-books-content">
                {/* Mapeamento das estantes para exibiliad com seas respectivas informações e livros */}
                {this.categories().map(c => (
                  <ListBooks
                    key={c.title}
                    //Spread coloca o objeto exatamente como é onde é chamado
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

        {/* Rota de Busca de Livros */}
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={books}
              onUpdateShelf={this.updateBook}
            />
          )}
        />
      </div>
    );
  }
}
