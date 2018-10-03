import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Search from './Search';
import BookList from './BookList';
import '../App.css';

export default class BookShelf extends Component {
  render() {
    const {
      books, sections, handleChange, loading,
    } = this.props;
    console.log(books);

    const renderSections = sections.map(section => (
      <div key={section.name} className="bookshelf">
        <h2 className="bookshelf-title">{section.title}</h2>
        <div className="bookshelf-books">
          <PulseLoader
            className="loader"
            sizeUnit="px"
            size={14}
            color="#123abc"
            loading={loading}
          />
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

