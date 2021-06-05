import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import { fetchUserDetail } from "../store/actions/userDetail";

const DetailUser = () => {
  const { userId } = useParams();
  const [userData, setUser] = useState(null);
  const userDetail = useSelector(
    (state) => state.userDetail.data
  );

  useEffect(() => {
    if (userDetail) setUser(userDetail);
  }, [userDetail]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetail(userId));
  }, [dispatch, userId]);

  const { name = '', username = '', posts = [] } = { ...userData };
  return (
    <Container>
      <div >
        {name} ( {username} )
      </div>
      <Row>
        <Col xs={12} md={5}>
          sidebar
        </Col>
        <Col>
          {
            posts.map((post) => {
              const { id, title } = post;
              return (
                <Card key={id} className="my-2">
                  <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{title}</CardText>
                  </CardBody>
                </Card>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  );
}

export default DetailUser;