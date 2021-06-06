import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import { fetchUserDetail, editUserPostsAction } from "../../store/actions/userDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faGlobe, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";
import PostForm from "../common/postForm";
import ModalEdit from "../common/modalEdit";
import PostCard from "../common/postCard";

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
          <PostForm userId={userId} name={name} type='post' />
          {
            reversedPost.map((post) => {
              const { id } = post;
              return (
                <PostCard key={id} className="my-2" {...post} name={name} setModal={setModal} setModalData={setModalData} >
                   <Link to={`/${userId}/post/${id}`} className="float-right">Comments</Link>
                </PostCard>
              )
            })
          }
        </Col>
      </Row>
      { modal && <ModalEdit modal={modal} setModal={setModal} {...modalData} editAction={editUserPostsAction} />}
    </Container>
  );
}

export default DetailUser;