import React, { useState } from 'react';

const AddCar = ({ onCarAdded }) => {
  const [carData, setCarData] = useState({
    id: 0, // Example ID, this should be dynamically set as needed
    condition: 'newCar', // Default condition
    category: '',
    name: '',
    year: '',
    miles: '',
    color: '',
    description: '',
    price: '',
    pictureUrl: '',
  });
  const [popupMessage, setPopupMessage] = useState(null); // Popup message state

  // Format miles with commas
  const formatMiles = (value) => {
    const miles = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    return miles.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas at every 3rd digit
  };

  const formatPrice = (value) => {
    let price = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters (except the dot)
    price = Math.floor(price / 1); // Remove decimals by rounding down
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas at every 3rd digit
    return `$${price}`; // Add the dollar sign at the beginning
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'condition') {
      setCarData(prevData => ({
        ...prevData,
        condition: value,
        category: `${value === 'newCar' ? 'new' : 'used'}${prevData.category}`,
      }));
    } else if (name === 'category') {
      setCarData(prevData => ({
        ...prevData,
        category: `${prevData.condition === 'newCar' ? 'new' : 'used'}${value}`,
      }));
    } else if (name === 'miles') {
      setCarData(prevData => ({
        ...prevData,
        [name]: formatMiles(value),
      }));
    } else if (name === 'price') {
      setCarData(prevData => ({
        ...prevData,
        [name]: formatPrice(value),
      }));
    } else {
      setCarData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Car Added:', carData);

    // Send a POST request to the backend with the correct data structure
    try {
      const response = await fetch("http://localhost:8081/addCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: carData.id,
          type: carData.condition, // Send type as either 'newCar' or 'usedCar'
          category: carData.category, // The formatted category (e.g., 'newSedan')
          name: carData.name,
          year: carData.year,
          miles: carData.miles.replace(/,/g, ''), // Remove commas before sending
          color: carData.color,
          description: carData.description,
          price: carData.price.replace(/,/g, ''), // Remove commas before sending
          pictureUrl: carData.pictureUrl,
        }),
      });

      if (response.ok) {
        console.log("Car added successfully");
        alert("Car Added Successfully!");
        // Optionally notify the parent component
        if (onCarAdded) {
          onCarAdded(carData);
        }
        // Reset the form after submission
        setCarData({
          id: 0,
          condition: 'newCar',
          category: '',
          name: '',
          year: '',
          miles: '',
          color: '',
          description: '',
          price: '',
          pictureUrl: '',
        });
      } else {
        if (response.status === 409) {
            alert("A car with this ID already exists.");
            throw new Error("A car with this ID already exists.");
        }
        throw new Error("Failed to add car.");
      }
    } catch (error) {
        setPopupMessage(error.message);
    }
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <a className="d-flex align-items-center text-body-emphasis text-decoration-none">
          <span className="fs-2">Add a Car</span>
        </a>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID Number</label>
          <input
            type="number"
            name="id"
            className="form-control"
            value={carData.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Condition</label>
          <div>
            <input
              type="radio"
              name="condition"
              value="newCar"
              checked={carData.condition === 'newCar'}
              onChange={handleInputChange}
            />
            <label className="form-check-label me-3">New</label>
            <input
              type="radio"
              name="condition"
              value="usedCar"
              checked={carData.condition === 'usedCar'}
              onChange={handleInputChange}
            />
            <label className="form-check-label">Used</label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={carData.category.replace(/(new|used)/, '')} // Display only category name, e.g., 'Van' instead of 'newVan'
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="Van">Van</option>
            <option value="Truck">Truck</option>
            <option value="Sedan">Sedan</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={carData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={carData.year}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miles</label>
          <input
            type="text"
            name="miles"
            className="form-control"
            value={carData.miles}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Color</label>
          <input
            type="text"
            name="color"
            className="form-control"
            value={carData.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={carData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={carData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Picture URL</label>
          <input
            type="url"
            name="pictureUrl"
            className="form-control"
            value={carData.pictureUrl}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCar;
