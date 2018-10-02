import React, { Component } from 'react';
import '../App.css';

export default class BookList extends Component {
  findIndex = (title) => {
    const { books } = this.props;
    for (let i = 0; i < books.length; i++) {
      if (books[i].title === title) {
        return i;
      }
    }
  }

  onChange = (e, book) => {
    const { books, handleChange, booksOnTheShelf } = this.props;
    const bookIndex = this.findIndex(book.title);
    books[bookIndex].shelf = e.target.value;
    handleChange(books[bookIndex], e.target.value, booksOnTheShelf ? true : false);
  }

  isBookOnTheShelf = (bookId) => {
    const { booksOnTheShelf } = this.props;
    const book = booksOnTheShelf && booksOnTheShelf.find(book => book.id === bookId);
    return book ? book.shelf : false;
  }

  render() {
    const { books } = this.props;
    return (
      <ol className="books-grid">
        {books && Array.isArray(books) && books.map((book, i) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }} />
                <div className="book-shelf-changer">
                  <select value={this.isBookOnTheShelf(book.id) || book.shelf || 'none'} onChange={e => this.onChange(e, book)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}
