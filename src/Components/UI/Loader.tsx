import React, { Fragment } from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

const Loader: React.FC = () => {
  return (
    <Fragment>
          <MDBSpinner grow size="sm">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
          <MDBSpinner grow size="sm">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
          <MDBSpinner grow size="sm">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
    </Fragment>
  );
};

export default Loader;
