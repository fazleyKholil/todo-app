import React from "react";
import { MDBIcon, MDBListGroupItem, MDBTooltip } from "mdb-react-ui-kit";

const TodoDueWarning: React.FC<{ due: Date }> = ({ due }) => {
  return (
    <MDBListGroupItem className="px-3 py-1 d-flex align-items-center border-0 bg-transparent">
      <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
        <p className="small mb-0">
          <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Due on date">
            <MDBIcon
              fas
              icon="hourglass-half"
              color="warning"
              className="me-2"
            />
          </MDBTooltip>
          {new Date(due).toDateString()}
        </p>
      </div>
    </MDBListGroupItem>
  );
};

export default TodoDueWarning;
