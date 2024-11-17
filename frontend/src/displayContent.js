import React from 'react';
import Homepage from './Homepage';
import DisplayCars from './displayCars';
import AddCar from './addCar'; 

const DisplayContent = ({ activeSection, onSectionChange }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <Homepage onSecChange={onSectionChange}/>
          </div>
        );
      case 'hours':
        return(
        <div id = "jumbotron">
            <div class="container py-4">
                <header class="pb-3 mb-4 border-bottom">
                <a class="d-flex align-items-center text-body-emphasis text-decoration-none">
                    <span class="fs-2">Hours</span>
                </a>
                </header>
    
                <div class="p-5 mb-5 bg-body-tertiary rounded-3">
                    <div class="container-fluid py-3">
                        <h1 class="display-7 fw-bold">Workplace Hours</h1>
                        <table>
                          <tr>
                            <td class="col-md-3 fs-4">Mon - Fri:</td>
                            <td class="col-md-6 fs-4">8:30am - 5:30pm</td>
                          </tr>
                          <tr>
                            <td class="col-md-3 fs-4">Saturday:</td>
                            <td class="col-md-6 fs-4">8:30am - 2:30pm</td>
                          </tr>
                          <tr>
                            <td class="col-md-3 fs-4">Sunday:</td>
                            <td class="col-md-6 fs-4">Closed</td>
                          </tr>
                        </table>
                    </div>
                </div>
                </div>
    
                <footer class="pt-3 mt-4 text-body-secondary border-top">
                &copy; Jack Kolker, Andrew Luebbers 2024
                </footer>
            </div>
        );
      case 'newSedans':
        return (
          <div>
            <DisplayCars category="newSedans" />
          </div>
        );
      case 'usedSedans':
        return (
          <div>
            <DisplayCars category="usedSedans" />
          </div>
        );
      case 'newTrucks':
        return (
          <div>
            <DisplayCars category="newTrucks" />
          </div>
        );
      case 'usedTrucks':
        return (
          <div>
            <DisplayCars category="usedTrucks" />
          </div>
        );
      case 'newVans':
        return (
          <div>
            <DisplayCars category="newVans" />
          </div>
        );
      case 'usedVans':
        return (
          <div>
            <DisplayCars category="usedVans" />
          </div>
        );
      case 'authors':
          return (
            <div className="container py-4">
              <header className="pb-3 mb-4 border-bottom">
                <a className="d-flex align-items-center text-body-emphasis text-decoration-none">
                  <span className="fs-2">Author Info</span>
                </a>
              </header>
        
              <div className="p-5 mb-5 bg-body-tertiary border rounded-3">
                <div className="container-fluid py-3">
                  <h1 className="display-7 fw-bold">ComS 3190 - Construction of User Interfaces</h1>
                  <h1 className="display-7 fw-bold">Final Project</h1>
                  <p className="col-md-12 fs-4">
                    This webpage was made for the course ComS 3190 as Iowa State University in the Fall 2024 semester and is authored by 
                    <span style={{ fontStyle: 'italic' }}> Jack Kolker </span> and 
                    <span style={{ fontStyle: 'italic' }}> Andrew Luebbers </span>.
                  </p>
                  <p className="col-md-12 fs-5">Date: November 2024</p>
                </div>
              </div>
        
              <div className="row align-items-md-stretch">
                <div className="col-md-6">
                  <div className="h-100 p-5 bg-body-tertiary rounded-3" style={{ border: '1px solid black' }}>
                    <h2 style={{ textAlign: 'center' }}>Jack Kolker</h2>
                    <p style={{ textAlign: 'center' }}>Email: jakolker@iastate.edu</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-5 bg-body-tertiary rounded-3" style={{ border: '1px solid black' }}>
                    <h2 style={{ textAlign: 'center' }}>Andrew Luebbers</h2>
                    <p style={{ textAlign: 'center' }}>Email: andlue@iastate.edu</p>
                  </div>
                </div>
              </div>
        
              <footer className="pt-3 mt-4 text-body-secondary border-top">
                &copy; Jack Kolker, Andrew Luebbers 2024
              </footer>
            </div>
          );
      case 'addCar':
          return (
            <div>
              <AddCar onCarAdded={(carData) => console.log("Car added:", carData)} />
            </div>
          );
      default:
        return <div><h2>Welcome to Auto Depot!</h2><p>Navigate using the left pane.</p></div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default DisplayContent;
