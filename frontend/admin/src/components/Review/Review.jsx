import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Reviews from "../../services/reviews.js"

const Review = () => { 
    const [reviews, setReviews] = useState([]);
    const [callback, setCallback] = useState(false);
    
    useEffect(() => {
        let cleanup = false;
        const fetchReviews = async () => {
            try {        
                if (!cleanup) {
                    const reviews = await Reviews.getReviews();
                    if (reviews != null) {
                        setReviews(reviews);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };      
        fetchReviews();
        return () => cleanup = true;
    }, [callback]);

    return (
        <>
            <div>
                {reviews.length > 0 ? <>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Відгук</th>                            
                                <th>ID клієнту</th>
                                <th>Ім'я</th>
                                <th>Фамілія</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => <tr className="text-center" key={index}>
                            <td>{review.id}</td>
                                <td>{review.text}</td>
                                <td>{review.user.id}</td>
                                <td>{review.user.name}</td>
                                <td>{review.user.surname}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </> : <>
                    <h4 style={{textAlign: "center"}}>
                        Немає відгуків
                    </h4>   
                </>}
            </div>
        </>
    );
};

export default Review;