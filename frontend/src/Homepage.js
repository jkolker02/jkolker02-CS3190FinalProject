import React, { useState, useEffect } from 'react';

const Homepage = ({ onSecChange }) => {
  const [cars, setCars] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);  // New state to track hovered card

  useEffect(() => {
    fetch('http://localhost:8081/listFeatured')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Function to handle mouse enter event
  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div id="jumbotron">
      <div className="container py-4">
        <div className="p-5 mb-1 pt-0 pb-0 rounded-5">
          <div className="container-fluid">
            <h1 className="display-4 fw-bold" style={{ textAlign: 'center' }}>
              Welcome to Auto Depot!
            </h1>
            <p className="col-md-12 fs-4" style={{ textAlign: 'center' }}>
              The greatest car browsing experience on the internet!
            </p>
          </div>
        </div>

        <div className="rounded-5">
          <div className="col-md-12 pb-3">
            <div
              className="h-100 p-2 mb-0 rounded-5"
              style={{ backgroundColor: '#f5f5f5', border: '1px solid black' }}
            >
              <h2 className="text-center mt-3">
                <strong>Featured Cars!</strong>
              </h2>
              <p
                className="pb-3"
                style={{ textAlign: 'center', fontSize: 'larger', color: '#bf1b20' }}
              >
                Check out these featured new vehicles
              </p>
              <div className="album py-2">
                <div className="container">
                  <div className="row justify-content-center g-3" id="col">
                    {cars.map((car, index) => (
                      <div
                        className="col"
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)} // On hover
                        onMouseLeave={handleMouseLeave} // On mouse leave
                      >
                        <div
                          className="card shadow-sm rounded-5"
                          style={{
                            width: '340px',
                            height: '400px',
                            border: '1px solid gray',
                            backgroundColor:
                              hoveredCard === index ? '#d8d8d8' : '', // Apply background color if hovered
                          }}
                        >
                          <div className="card-body">
                            <p className="card-text">
                              {' '}
                              <strong>
                                {car.year} {car.name}{' '}
                              </strong>
                            </p>
                            <div className="image-container mb-2">
                              <img
                                className="hover-img rounded-5"
                                style={{
                                  width: '300px',
                                  height: '180px',
                                  objectFit: 'cover',
                                }}
                                src={car.picture}
                                alt={`${car.name} image`} // alt text for the image
                              />
                            </div>
                            <p className="card-text d-flex justify-content-between mb-2">
                              <strong> ${car.price}</strong>
                              <span>Miles: {car.miles}</span>
                            </p>
                            <p className="card-text"> {car.description} </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Other content */}
        </div>

        <footer className="pt-3 mt-4 text-body-secondary border-top">
          &copy; Jack Kolker, Andrew Luebbers 2024
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
