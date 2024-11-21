import React, { useState } from 'react';

const Navbar = ({ onSectionChange }) => {
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [isNewVehiclesOpen, setIsNewVehiclesOpen] = useState(true);
  const [isUsedVehiclesOpen, setIsUsedVehiclesOpen] = useState(true);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(true);

  return (
    <div style={{ width: '180px', position: 'fixed', height: '100%', top: 0 }}>
      <div className="flex-shrink-0 p-3">
        <a className="d-flex align-items-center justify-content-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
          <span className="fs-3 autoDepot fw-semibold text-center">Auto Depot</span>
        </a>

        <ul className="list-unstyled ps-0">
          {/* Home Dropdown */}
          <li className="mb-1">
            <button
              className="fs-5 btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => {
                setIsHomeOpen(!isHomeOpen);
              }}
              aria-expanded={isHomeOpen ? 'true' : 'false'}
            >
              General
            </button>
            <div className={`collapse ${isHomeOpen ? 'show' : ''}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ paddingLeft: '20px' }}>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('home')}>Home</a></li>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded dropText" onClick={() => onSectionChange('hours')}>Hours</a></li>
              </ul>
            </div>
          </li>

          {/* New Vehicles Dropdown */}
          <li className="mb-1">
            <button
              className="fs-5 btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => {
                setIsNewVehiclesOpen(!isNewVehiclesOpen);
              }}
              aria-expanded={isNewVehiclesOpen ? 'true' : 'false'}
            >
              New Vehicles
            </button>
            <div className={`collapse ${isNewVehiclesOpen ? 'show' : ''}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ paddingLeft: '20px' }}>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('newTrucks')}>Trucks</a></li>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('newSedans')}>Sedans</a></li>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('newVans')}>Vans</a></li>
              </ul>
            </div>
          </li>

          {/* Used Vehicles Dropdown */}
          <li className="mb-1">
            <button
              className="fs-5 btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => {
                setIsUsedVehiclesOpen(!isUsedVehiclesOpen);
              }}
              aria-expanded={isUsedVehiclesOpen ? 'true' : 'false'}
            >
              Used Vehicles
            </button>
            <div className={`collapse ${isUsedVehiclesOpen ? 'show' : ''}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ paddingLeft: '20px' }}>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('usedTrucks')}>Trucks</a></li>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('usedSedans')}>Sedans</a></li>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('usedVans')}>Vans</a></li>
              </ul>
            </div>
          </li>


          {/* Add Your Car Section */}
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="fs-5 btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => onSectionChange('addCar')}
            >
              List a Vehicle
            </button>
          </li>

          {/* Authors Dropdown */}
          <li className="border-top my-3"></li>
          <li className="mb-1">
            <button
              className="fs-5 btn btn-toggle d-inline-flex align-items-center rounded border-0"
              onClick={() => {
                setIsAuthorsOpen(!isAuthorsOpen);
              }}
              aria-expanded={isAuthorsOpen ? 'true' : 'false'}
            >
              Authors
            </button>
            <div className={`collapse ${isAuthorsOpen ? 'show' : ''}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{ paddingLeft: '20px' }}>
                <li><a href="#!" className="fs-6 d-inline-flex text-decoration-none rounded" onClick={() => onSectionChange('authors')}>Info</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
