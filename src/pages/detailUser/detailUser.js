import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { fetchUserDetail, editUserPostsAction, deleteUserPostsAction } from "../../store/actions/userDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Avatar from "react-avatar";
import PostForm from "../../components/common/postForm";
import ModalEdit from "../../components/common/modalEdit";
import PostCard from "../../components/common/postCard";
import { deletePost } from "../../services/post";

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
  };

  const {
    name = '',
    username = '',
    email = '',
    website = ''
  } = { ...userData };
  const reversedPost = [...userPostsData].reverse();

  return (
    <Fragment>
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
              <CardTitle className="d-flex justify-content-between">Albums</CardTitle>
              <Row className="no-gutters">
                {
                  userAlbumsData.map((album) => {
                    const { id, title } = album
                    return (
                      <Col xs={4} key={id} className="text-truncate text-center mb-2">
                        <Link to={`/user/${userId}/albums/${id}`}>
                          <Avatar name={title} />
                        </Link>
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
                <PostCard
                  key={id}
                  className="my-2" {...post}
                  name={name}
                  setModal={setModal}
                  setModalData={setModalData}
                  deletePost={deleteUserPost}
                >
                  <Link to={`/user/${userId}/post/${id}`} className="float-right">Comments</Link>
                </PostCard>
              )
            })
          }
        </Col>
      </Row>
      { modal && <ModalEdit modal={modal} setModal={setModal} {...modalData} editAction={editUserPostsAction} />}
    </Fragment>
  );
}

export default DetailUser;