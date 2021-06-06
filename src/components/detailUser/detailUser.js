import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardLink, CardText, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { fetchUserDetail, deleteUserPostsAction } from "../../store/actions/userDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faGlobe, faChevronRight, faUserFriends, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";

import { deletePost } from "../../services/post";
import PostForm from "./postForm";
import ModalEdit from "./modalEdit";

const DetailUser = () => {
  const { userId } = useParams();

  const [userData, setUser] = useState(null);
  const [userPostsData, setPosts] = useState([]);
  const [userAlbumsData, setAlbums] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);

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
  const editUserPost = (id, title, body) => {
    setModal(true);
    console.log(modal);
    const props = {
      
      userId,
      name,
      title,
      body,
      postId: id
    }
    setModalData(props);
  }
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
          <PostForm userId={userId} name={name} type='post' />
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
                          <DropdownItem onClick={() => editUserPost(id, title, body)}>Edit</DropdownItem>
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
      { modal && <ModalEdit modal={modal} setModal={setModal} {...modalData} />}
    </Container>
  );
}

export default DetailUser;