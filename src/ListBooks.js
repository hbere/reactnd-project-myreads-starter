import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

    handleShelfMove = (book, event) => {
        let newShelf = event.target.value;
        BooksAPI.update(book, newShelf)
            .then((response) => {
                console.log(response);
                this.render();
            })
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.props.shelves.map((shelf) => (
                            <div className="bookshelf" key={shelf.id}>
                                <h2 className="bookshelf-title">{shelf.label}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {this.props.books.filter(book => book.shelf === shelf.id).map((book) => (
                                            <li key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select onChange={(event) => this.handleShelfMove(book, event)}>
                                                                <option value="move" disabled>Move to...</option>
                                                                {this.props.shelves.map((shelf) => (
                                                                    <option value={shelf.id} selected={shelf.id == book.shelf} key={shelf.id}>{shelf.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{book.title}</div>
                                                    {book.authors.map((author) => (
                                                        <div className="book-authors" key={book.id + ',' + author}>{author}</div>
                                                    ))}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link className="open-search" to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks