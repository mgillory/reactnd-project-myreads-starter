import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import BookList from './BookList';
import '../App.css';

export default class BookShelf extends Component {
  render() {
    const { books, sections, handleChange } = this.props;
    console.log(books);

    const renderSections = sections.map(section => (
      <div key={section.name} className="bookshelf">
        <h2 className="bookshelf-title">{section.title}</h2>
        <div className="bookshelf-books">
          <BookList
            books={books.filter(book => book.shelf === section.name)}
            handleChange={handleChange}
          />
        </div>
      </div>
    ));

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {renderSections}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" component={Search}>Add a book</Link>
        </div>
      </div>
    );
  }
}

