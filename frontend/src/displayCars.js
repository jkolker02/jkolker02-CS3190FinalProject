import React, { useState, useEffect } from 'react';

const DisplayCars = ({ category }) => {
  const [cars, setCars] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [ratings, setRatings] = useState({});

  const apiEndpoints = {
    newTrucks: '/newTrucks',
    newSedans: '/newSedans',
    newVans: '/newVans',
    usedTrucks: '/usedTrucks',
    usedSedans: '/usedSedans',
    usedVans: '/usedVans',
    featured: '/listFeatured',
  };

  const categories = {
    newTrucks: { title: 'New Trucks', description: 'Browse our selection of new trucks!', subDescription: 'These vehicles are great for heavy-duty hauling and towing.' },
    newSedans: { title: 'New Sedans', description: 'Browse our selection of new sedans!', subDescription: 'Comfort and style combined for your daily commute.' },
    newVans: { title: 'New Vans', description: 'Browse our selection of new vans!', subDescription: 'Spacious and versatile for all your needs.' },
    usedTrucks: { title: 'Used Trucks', description: 'Browse our selection of used trucks!', subDescription: 'Great for budget-conscious heavy-duty tasks.' },
    usedSedans: { title: 'Used Sedans', description: 'Browse our selection of used sedans!', subDescription: 'Affordable and reliable cars for everyone.' },
    usedVans: { title: 'Used Vans', description: 'Browse our selection of used vans!', subDescription: 'The best deals on spacious vehicles.' },
  };

  const { title, description, subDescription } = categories[category] || {};

  useEffect(() => {
    fetch(`http://localhost:8081${apiEndpoints[category]}`)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [category]);

  const handleMouseEnter = (index) => setHoveredCard(index);
  const handleMouseLeave = () => setHoveredCard(null);

  const handleDelete = (carId) => {
    fetch(`http://localhost:8081/deleteCar/${carId}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete car');
            }
            // Remove the car from the state
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
        })
        .catch((error) => console.error('Error deleting car:', error));
  };

  const handleRating = (carId, rating) => {
    fetch(`http://localhost:8081/addReview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carId, rating }),
    })
      .then(() => {
        // Update the ratings state
        setRatings((prevRatings) => ({ ...prevRatings, [carId]: rating }));
  
        // Update the reviews in the corresponding car object
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === carId
              ? {
                  ...car,
                  reviews: [...(car.reviews || []), rating], // Append the new rating
                }
              : car
          )
        );
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };

  const calculateAverageRating = (ratingsArray) => {
    if (!ratingsArray || ratingsArray.length === 0) return 'N/A';
    const total = ratingsArray.reduce((acc, curr) => acc + curr, 0);
    return (total / ratingsArray.length).toFixed(1); // Rounded to 1 decimal place
  };

  const renderStars = (carId, averageRating) => {
    const currentRating = ratings[carId] || 0;
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              onClick={() => handleRating(carId, starValue)}
              style={{
                cursor: 'pointer',
                color: starValue <= currentRating ? '#ffd700' : '#000000',
                fontSize: '20px',
              }}
            >
              ★
            </span>
          );
        })}
        <span style={{ marginLeft: '8px', fontSize: '14px', color: '#555' }}>
          ({averageRating})
        </span>
      </div>
    );
  };

  return (
    <div id="jumbotron">
      <div className="container py-4">
        <div className="px-4 py-2 mb-5 bg-body-tertiary rounded-3">
          <div className="container-fluid py-3">
            <h1 className="display-7 fw-bold mb-3">{title}</h1>
            <h2 className="mb-3" style={{ fontSize: '24px' }}>{description}</h2>
            <h2 style={{ fontSize: '20px' }}>{subDescription}</h2>
            <div className="rounded-5">
              <div className="col-md-12 pb-3">
                <div className="h-100 p-2 mb-0 rounded-5" style={{ backgroundColor: '#f5f5f5' }}>
                  <div className="album py-2">
                    <div className="container">
                      <div className="row justify-content-center g-3" id="col">
                        {cars.map((car, index) => (
                          <div
                            className="col"
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div
                              className="card shadow-sm rounded-5"
                              style={{
                                width: '340px',
                                height: '450px',
                                border: '1px solid gray',
                                backgroundColor: hoveredCard === index ? '#d8d8d8' : '',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative',
                              }}
                            >
                            
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: 'gray',
                                    color: 'white',
                                    fontSize: '12px', // Adjusted to fit the circle
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0', // Ensures no extra padding
                                    lineHeight: '1', // Ensures consistent line height
                                    cursor: 'pointer',
                                    border: 'none',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                }}
                                onClick={() => handleDelete(car.id)}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        margin: '0', // Ensures no extra margin
                                        padding: '0', // Ensures no extra padding
                                    }}
                                >
                                    x
                                </div>
                            </button>



                              <div className="card-body" style={{ flex: '1' }}>
                                <p className="card-text">
                                  <strong>{car.year} {car.name}</strong>
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
                                    alt={`${car.name} image`}
                                  />
                                </div>
                                <p className="card-text d-flex justify-content-between mb-2">
                                  <strong>${car.price}</strong>
                                  <span>Miles: {car.miles}</span>
                                </p>
                                <p className="card-text">{car.description}</p>
                              </div>
                              <div
                                className="stars-container"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  padding: '8px',
                                  borderTop: '1px solid #ddd',
                                }}
                              >
                                {renderStars(car.id, calculateAverageRating(car.reviews))}
                              </div>
                              <div
                                style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                fontSize: '12px',
                                color: 'gray',
                                }}
                            >
                                ID: {car.id}
                            </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="pt-3 mt-4 text-body-secondary border-top">
              &copy; Jack Kolker, Andrew Luebbers 2024
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCars;
