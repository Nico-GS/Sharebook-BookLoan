import React from "react";
import axios from "axios";
import Book from "./Book";
import {Link} from 'react-router-dom';
import "../scss/MyBooks.scss";

const MyBooks = () => {

    const [myBooks, setMyBooks] = React.useState([]);

    const fetchBooks = () => {
        axios.get('/books').then(response => {
            setMyBooks(response.data)
        })
    }

    React.useEffect(() => {
        fetchBooks();
    }, [])

    const handleDelete = (bookId) => {
        axios.delete(`/books/${bookId}`).then(response => {
        fetchBooks();
        })
    }

    return (
        <div>
            <h1>Mes livres</h1>
            <div className="list-container">
                {myBooks.length === 0 ? "Vous n'avez pas déclaré de livres" : null}
                {myBooks.map(book => (<div key={book.id} className="mybook-container">
                        <Book title={book.title} category={book.category.label}/>
                        <div className="container-buttons">
                            <Link to={`/addBooks/${book.id}`}>
                                <button className="btn btn-primary btn-sm">Modifier</button>
                            </Link>
                            <button className="btn btn-primary btn-sm" onClick={() => handleDelete(book.id)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/addBooks">
                <button className="btn btn-primary btn-sm">Nouveau livre</button>
            </Link>
        </div>
    )


}

export default MyBooks

