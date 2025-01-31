import React from "react";
import { Link } from "react-router-dom";
import '../Langue.css'

const Card = ({ langue }) => {
    const pathLangue = langue.langue.toLowerCase().substring(0,2)
    return (
        <Link to={`/test/home`} className="col-4">
            <div className="card-langue container">
                <div className="card-body">
                    <h5 className="card-title">{langue.langue}</h5>
                    <img src={langue.image} alt={langue.langue} className="card-img"/>
                </div>
            </div>
        </Link>
    );
};

export default Card;