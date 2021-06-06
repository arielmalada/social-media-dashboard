import { Container } from "reactstrap";
import NavigationBar from "../components/common/navbar";

const DefaultLayout = (props) => {
  return ( 
    <div>
      <NavigationBar />
      <Container>
        {props.children}
      </Container>
    </div>
   );
}
 
export default DefaultLayout;