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

  const {
    name = '',
    username = '',
    posts = [],
    albums = [],
    email = '',
    website = ''
  } = { ...userData };
  return (
    <Container>
      <div className="text-center">
        {name} ( {username} )
      </div>
      <Row>
        <Col xs={12} md={5}>
          <Card className="my-2">
            <CardBody>
              <CardTitle>Intro</CardTitle>
              <div>Email {email}</div>
              <div>{website}</div>
            </CardBody>
          </Card>
          <Card className="my-2">
            <CardBody>
              <CardTitle>Albums</CardTitle>
              <Row>
                {
                  albums.map((album) => {
                    const { id, title } = album
                    return (
                      <Col xs={3} key={id} className="text-truncate">
                        {title}
                      </Col>
                    )
                  })
                }
              </Row>
            </CardBody>
          </Card>
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