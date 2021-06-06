import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { Navbar, NavbarBrand } from "reactstrap";

const NavigationBar = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack()
  }
  return (
    <Navbar light expand="md">
      <button type="button" className="btn btn-primary" onClick={goBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <NavbarBrand className="ml-auto">
        Pacebo-ok
      </NavbarBrand>
    </Navbar>
  );
}

export default NavigationBar;