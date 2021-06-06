import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardLink, CardText, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { fetchUserDetail, addUserPostsAction, deleteUserPostsAction } from "../store/actions/userDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faGlobe, faChevronRight, faUserFriends, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";
import { useForm } from "react-hook-form";
import { addPost, deletePost } from "../services/post";

const DetailUser = () => {
  const { userId } = useParams();

  const [userData, setUser] = useState(null);
  const [userPostsData, setPosts] = useState([]);
  const [userAlbumsData, setAlbums] = useState([]);
  const { register, handleSubmit } = useForm();

  const {
    data: userDetail,
    posts: userPosts,
    albums: userAlbums
  } = useSelector((state) => state.userDetail);

  useEffect(() => {
    if (userDetail) setUser(userDetail);
    if (userPosts) setPosts(userPosts);
    if (userAlbums) setAlbums(userAlbums);
  }, [userDetail, userPosts, userAlbums]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserDetail(userId));
  }, [dispatch, userId]);

  const onSubmit = (id, data) => {
    const dataRes = {
      id: id,
      ...data
    }
    addPost(dataRes).then(
      (res) =>
        dispatch(addUserPostsAction(res.data))
    ).catch(
      (error) => console.log(error)
    )
  }

  const deleteUserPost = (id) => {
    deletePost(id).then(
      (res) =>
        dispatch(deleteUserPostsAction(id))
    ).catch(
      (error) => console.log(error)
    )
  }
  const {
    name = '',
    username = '',
    email = '',
    website = ''
  } = { ...userData };
  const reversedPost = [...userPostsData].reverse();
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
                  userAlbumsData.map((album) => {
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
              <form onSubmit={handleSubmit((data) => onSubmit(userId, data))}>
                <div className="d-flex flex-row mb-3 align-items-center">
                  <div>
                    <Avatar name={name} round className="mr-2" size="48" />
                  </div>
                  <div className="w-100">
                    <input {...register("title")} className="form-control mb-2" placeholder="title" />
                    <input {...register("body")} className="form-control" placeholder="what's on your mind" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Post</button>
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
                          <DropdownItem onClick={() => deleteUserPost(id)}>Delete</DropdownItem>
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