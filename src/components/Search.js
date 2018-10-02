import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import BookList from './BookList';
import { search } from '../BooksAPI';
import '../App.css';

export default class Search extends Component {
  state = {
    searchQuery: '',
    queryResult: undefined
  }

  onChangeQuery = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
    console.log(e.target.value)
    search(e.target.value)
      .then((res) => {
        console.log(res)
        this.setState({ queryResult: res })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { queryResult } = this.state;
    const { booksOnTheShelf, handleChange } = this.props;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" component={BookShelf} className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.searchQuery}
                onChange={this.onChangeQuery}
              />
            </div>
          </div>
          <div className="search-books-results">
            <BookList
              books={queryResult}
              booksOnTheShelf={booksOnTheShelf}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

