import React from "react";
import axios from "axios";
import Book from "./Book";
import "../scss/MyBorrows.scss";

function MyBorrows() {

    const getMyBorrows = () => {
        axios.get('/borrows').then(response => {
            setMyBorrows(response.data)
        })
    }

    const [myBorrows, setMyBorrows] = React.useState([]);
    React.useEffect(() => {
        getMyBorrows();
    }, [])

    const closeBorrow = (borrowId) => {
        axios.delete(`/borrows/${borrowId}`).then(response => {
            getMyBorrows();
        })
    }


    return (
        <div className="container">
            <h1>Mes emprunts</h1>
            <div className="list-container">
                {myBorrows.map(borrow => {
                    return (
                        <div className="borrow-container" key={borrow.id}>
                            <Book
                                title={borrow.book.title}
                                category={borrow.book.category.label}
                                lender={borrow.lender.firstName + " " + borrow.lender.lastName}
                                askDate={borrow.askDate}
                                closeDate={borrow.closeDate}>
                            </Book>
                            <div className="text-center">
                                {borrow.closeDate ? "" : <button className="btn btn-primary btn-sm"
                                                                 onClick={() => closeBorrow(borrow.id)}>Clore</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {myBorrows.length === 0 ? <div>Vous n'avez pas d'emprunts</div> : null}
        </div>
    )

}

export default MyBorrows