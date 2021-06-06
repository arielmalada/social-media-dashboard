import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { Container, Card, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardTitle, CardText } from "reactstrap";
import { fetchPostDetail, editPostDetailAction, editPostCommentAction } from "../../store/actions/postDetail";
import { useForm } from "react-hook-form";
import ModalEdit from "../common/modalEdit";
import PostCard from "../common/postCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { editComment } from "../../services/comments";
import CommentCard from "../common/commentCard";

const DetailPost = () => {
  const { userId, postId } = useParams();
  const [postData, setPost] = useState(null);
  const [userData, setUser] = useState(null);
  const [postCommentsData, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState(false);
  const [modalPostData, setModalPostData] = useState(false);

  const {
    data: postDetail,
    comments: postComments,
    user: userDetail
  } = useSelector((state) => state.postDetail);


  useEffect(() => {
    if (postDetail) setPost(postDetail);
    if (userDetail) setUser(userDetail);
    if (postComments) setPosts(postComments);
  }, [postDetail, userDetail, postComments]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostDetail(userId, postId));
  }, [dispatch, postId, userId]);



  const { name } = { ...userData }
  return (
    <Container className="my-2">
      <PostCard {...postData} name={name} setModal={setModalPost} setModalData={setModalPostData}>
        <div className="d-flex flex-row-reverse">
          <div >{postCommentsData.length} Comments</div>
        </div>
        <div className="py-3">
          {postCommentsData.map((comment) => <CommentCard {...comment} />)}
        </div>
      </PostCard>

      { modalPost && <ModalEdit modal={modalPost} setModal={setModalPost} {...modalPostData} editAction={editPostDetailAction} />}

    </Container>
  );
}

export default DetailPost;