import React from "react";
import { Link } from "react-router-dom";
import {
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
  MDBTooltip,
  MDBBtn,
} from "mdb-react-ui-kit";

const FilterSortWidget: React.FC = () => {
  return (
    <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
      <p className="small mb-0 me-2 text-muted">Filter</p>
      <MDBDropdown>
        <MDBDropdownToggle>Filter</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>All</MDBDropdownItem>
          <MDBDropdownItem link>Completed</MDBDropdownItem>
          <MDBDropdownItem link>Pending</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>

      <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
      <MDBDropdown>
        <MDBDropdownToggle>Sort</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Added date</MDBDropdownItem>
          <MDBDropdownItem link>Due date</MDBDropdownItem>
          <MDBDropdownItem link>Pending</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>

      <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Ascending">
        <MDBIcon
          fas
          icon="sort-amount-down-alt"
          className="ms-2"
          style={{ color: "#23af89" }}
        />
      </MDBTooltip>

      <Link to="create">
        <MDBBtn className="add-btn" size="lg" floating aria-label='create-todo'>
          <MDBIcon fab icon="add"/>
        </MDBBtn>
      </Link>
    </div>
  );
};

export default FilterSortWidget;
