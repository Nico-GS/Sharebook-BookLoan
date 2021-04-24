import React from "react";
import {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import "../scss/AddBook.scss";
import axios from "axios";

function AddBook() {

    let {bookId} = useParams();
    const [bookData, setBookData] = useState({});
    const [categoriesData, setCategoriesData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('/categories').then(response => {
            setCategoriesData(response.data)
            setBookData({
                title: '',
                categoryId: response.data[0].id
            })
        })
            .then(() => {
                if (bookId) {
                    axios.get(`/books/${bookId}`).then(response => {
                        setBookData({
                            title: response.data.title,
                            categoryId: response.data.category.id
                        })
                    })
                }
            })
    }, [bookId])



    const handleChange = (event) => {
        let currentState = {...bookData};
        currentState[event.target.name] = event.target.value;
        setBookData(currentState);
    }

    const onSubmit = (event) => {
        if (bookId) {
            event.preventDefault();
            axios.put(`/books/${bookId}`, {
                ...bookData
            }).then(() => {
                // Rediriger vers myBooks
                history.push("/myBooks")
            })
        } else {
            // Pas de rechargement de page
            event.preventDefault();
            console.log("onSubmit")
            console.log(bookData)
            axios.post('/books', {
                ...bookData
            }).then(() => {
                // Rediriger vers myBooks, history = router
                history.push("/myBooks")
            })
        }

    }

    return (
        <div className="container-add-book">
            <h1>Ajouter un livre</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre : </label>
                    <input name="title" type="test" onChange={handleChange} value={bookData.title} className="form-control"></input>
                </div>
                <div>
                    <label>Catégorie du livre : </label>
                    <select name="categoryId" value={bookData.categoryId} onChange={handleChange} className="form-control">
                        {categoriesData.map(category => (
                            <option value={category.id} key={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div className="container-submit">
                    <input type="submit" value="Valider" className="btn btn-primary"></input>
                </div>
            </form>
        </div>

    )

}

export default AddBook