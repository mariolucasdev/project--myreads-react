import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './../utils/BooksAPI';
import ListBooks from './ListBooks';
import { DebounceInput} from 'react-debounce-input';

export default class SearchBooks extends Component {

  state = {
    search: '',
    searchBooks: []
  }
  
  // Metodo que faz a pesquisa de livros na API usando os termos passado pelo estado search
  searchBooks = value => {
    BooksAPI.search(value.trim())
    // Promisse que retorna os dados vindos da API
      .then(res => {
        // Tratamento de retorno para evitar erros no map a seguir
        if(res && !res.error){
          // Constante que recebe um novo array com os dados de estados de livros alterado de acordo com os dados recebidos no props
          const booksResults = res.map(book => {
            let bookFind = this.props.books.find(b => b.id === book.id);
            if(bookFind){
              book.shelf = bookFind.shelf;
            } else {
              book.shelf = "none";
            }
            return book;
          });
          // Alteração de estado do searchBooks agora recebendo os livros com seu respectivo shelf
          this.setState({ searchBooks : booksResults})
        }
    });
  };
  
  // Método que captura a mudança do select para disparar a pesquisa
  handleChange = value => {
    this.setState({ search: value });
    this.searchBooks(this.state.search);
  };
  
  // Método que recebe o clique par alteração de Shelf do livro
  handleClick = (book, shelf) => {
    this.props.onUpdateShelf(book, shelf);
  };
  
  render() {
    const { search, searchBooks } = this.state;
    console.log(this.state.SearchBooks);
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={4}
              debounceTimeout={1000}
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grind">
            {search.trim() !== '' && (
              <ListBooks
                title={`${searchBooks.length} resultado(s) para "${search}"`}
                books={searchBooks}
                onUpdateShelf={this.handleClick}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
