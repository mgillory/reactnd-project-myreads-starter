import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import BookShelf from './BookShelf';
import BookList from './BookList';
import { search } from '../BooksAPI';
import '../App.css';

export default class Search extends Component {
  state = {
    searchQuery: '',
    queryResult: undefined,
    loading: false
  }

  onChangeQuery = (e) => {
    this.setState({
      searchQuery: e.target.value,
      loading: true
    });
    console.log(e.target.value)
    search(e.target.value)
      .then((res) => {
        console.log(res)
        this.setState({ queryResult: res, loading: false })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { queryResult, loading } = this.state;
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
            <PulseLoader
              className="loader"
              sizeUnit={"px"}
              size={14}
              color={'#123abc'}
              loading={loading}
            />
            <BookList
              books={queryResult}
              booksOnTheShelf={booksOnTheShelf}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div >
    );
  }
}

