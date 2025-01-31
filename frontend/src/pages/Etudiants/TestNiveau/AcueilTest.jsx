import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const frames = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Intermédiaire",
      description: "Améliorez vos compétences.",
    },
    {
      id: 3,
      image: "https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png",
      title: "Avancé",
      description: "Devenez un expert.",
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Bienvenue !</h1>
      <div className="row">
        {frames.map((frame) => (
          <Link className="col-md-4" key={frame.id} to={`/lang/${frame.id}`}>
            <div className="card mb-4 shadow-sm">
              <img
                className="card-img-top"
                src={frame.image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{frame.title}</h5>
                <p className="card-text">{frame.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage
