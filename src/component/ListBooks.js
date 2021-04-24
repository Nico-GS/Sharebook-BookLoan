import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import Book from "./Book";
import "../scss/ListBooks.scss";
import "../scss/MyBooks.scss";

export class ListBooks extends React.Component {

    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        axios.get('/books?status=FREE').then(response => {
            this.setState({books: response.data})
        })
    }

    borrowBook(bookId) {
        axios.post(`/borrows/${bookId}`, {}).then(()=> {
            this.props.history.push('/myBorrows')
        })
    }


    render() {
        console.log('render')
        return <div>
            <h1>Livres disponibles</h1>
            <div className="list-container">
                {this.state.books.length === 0 ? "Pas de livres disponibles" : null}
                {this.state.books.map(book => (<div className="list-book-container">
                        <Book title={book.title} category={book.category.label} lender={`${book.user.firstName} ${book.user.lastName}`}/>
                        <button className="btn btn-primary btn-sm" onClick={() => this.borrowBook(book.id)}>Emprunter</button>                    </div>
                ))}
            </div>
        </div>
    }

}

export default withRouter(ListBooks)