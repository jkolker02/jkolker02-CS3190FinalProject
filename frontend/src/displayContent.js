import React from 'react';

const DisplayContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div>
            <h2>Welcome</h2>
            <p>Welcome to Auto Depot! Explore our options.</p>
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
            <h2>New Sedans</h2>
            <p>Here are our available new sedans:</p>
            <ul>
              <li>New Sedan Model 1</li>
              <li>New Sedan Model 2</li>
              <li>New Sedan Model 3</li>
            </ul>
          </div>
        );
      case 'usedSedans':
        return (
          <div>
            <h2>Used Sedans</h2>
            <p>Here are our available used sedans:</p>
            <ul>
              <li>Used Sedan Model 1</li>
              <li>Used Sedan Model 2</li>
              <li>Used Sedan Model 3</li>
            </ul>
          </div>
        );
      case 'newTrucks':
        return (
          <div>
            <h2>New Trucks</h2>
            <p>Here are our available new trucks:</p>
            <ul>
              <li>New Truck Model 1</li>
              <li>New Truck Model 2</li>
              <li>New Truck Model 3</li>
            </ul>
          </div>
        );
      case 'usedTrucks':
        return (
          <div>
            <h2>Used Trucks</h2>
            <p>Here are our available used trucks:</p>
            <ul>
              <li>Used Truck Model 1</li>
              <li>Used Truck Model 2</li>
              <li>Used Truck Model 3</li>
            </ul>
          </div>
        );
      case 'newVans':
        return (
          <div>
            <h2>New Vans</h2>
            <p>Here are our available new vans:</p>
            <ul>
              <li>New Van Model 1</li>
              <li>New Van Model 2</li>
              <li>New Van Model 3</li>
            </ul>
          </div>
        );
      case 'usedVans':
        return (
          <div>
            <h2>Used Vans</h2>
            <p>Here are our available used vans:</p>
            <ul>
              <li>Used Van Model 1</li>
              <li>Used Van Model 2</li>
              <li>Used Van Model 3</li>
            </ul>
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
          
      default:
        return <div><h2>Welcome</h2><p>Choose a vehicle category from the menu.</p></div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default DisplayContent;
