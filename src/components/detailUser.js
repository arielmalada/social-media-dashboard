import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardLink, CardText, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Row, UncontrolledDropdown } from "reactstrap";
import { fetchUserDetail } from "../store/actions/userDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faGlobe, faChevronRight, faUserFriends, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";
import { useForm } from "react-hook-form";
import { Button } from "bootstrap";

const DetailUser = () => {
  const { userId } = useParams();
  const [userData, setUser] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }
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
  const reversedPost = [...posts].reverse();
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
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-row mb-3 align-items-center">
                  <div>
                    <Avatar name={name} round className="mr-2" size="48" />
                  </div>
                  <div  className="w-100">
                    <input {...register("title")} className="form-control mb-2" placeholder="title" />
                    <input {...register("body")} className="form-control" placeholder="what's on your mind" />
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Post</button>
              </form>
            </CardBody>
          </Card>
          {
            reversedPost.map((post) => {
              const { id, title, body } = post;
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
                    <CardText>{body}</CardText>
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