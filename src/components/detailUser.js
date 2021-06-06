import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardLink, CardText, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { fetchUserDetail } from "../store/actions/userDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faGlobe, faChevronRight, faUserFriends, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";

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
        <div>
          <Avatar name={name} round />
        </div>
        {name} ( {username} )
      </div>
      <Row>
        <Col xs={12} md={5}>
          <Card className="my-2">
            <CardBody>
              <CardTitle>Intro</CardTitle>
              <div><FontAwesomeIcon icon={faAt} /> {email}</div>
              <div><FontAwesomeIcon icon={faGlobe} /> {website}</div>
            </CardBody>
          </Card>
          <Card className="my-2">
            <CardBody>
              <CardTitle className="d-flex justify-content-between">Albums <FontAwesomeIcon icon={faChevronRight} /></CardTitle>
              <Row className="no-gutters">
                {
                  albums.map((album) => {
                    const { id, title } = album
                    return (
                      <Col xs={4} key={id} className="text-truncate text-center mb-2">
                        <Avatar name={title} />
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
                    <div className="float-right">
                      <UncontrolledDropdown>
                        <DropdownToggle color="link">
                          <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>Edit</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    <CardTitle className="d-flex">
                      <Avatar name={name} round className="mr-2" size="48" />
                      <span>
                        <div>{name}</div>
                        <div><FontAwesomeIcon icon={faUserFriends} size="xs" /></div>
                      </span>
                    </CardTitle>
                    <CardText>{title}</CardText>
                    <CardLink href="#" className="float-right">Comments</CardLink>
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