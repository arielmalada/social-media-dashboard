import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { fetchPostDetail, editPostDetailAction } from "../../store/actions/postDetail";
import ModalEdit from "../../components/common/modalEdit";
import PostCard from "../../components/common/postCard";
import CommentCard from "../../components/common/commentCard";
import { deleteUserPostsAction } from "../../store/actions/userDetail";
import { deletePost } from "../../services/post";

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
  const history = useHistory();
  const goBack = () => {
    history.goBack()
  }
  const deletePostDetail = (id) => {
    deletePost(id).then(
      (res) => {
        dispatch(deleteUserPostsAction(id))
        return (goBack())
      }
    ).catch(
      (error) => console.log(error)
    )
  };

  useEffect(() => {
    dispatch(fetchPostDetail(userId, postId));
  }, [dispatch, postId, userId]);
  const { name } = { ...userData }
  return (
    <div className="my-2">
      <PostCard
        {...postData}
        name={name}
        setModal={setModalPost}
        setModalData={setModalPostData}
        deletePost={deletePostDetail}
      >
        <div className="d-flex flex-row-reverse">
          <div >{postCommentsData.length} Comments</div>
        </div>
        <div className="py-3">
          {postCommentsData.map((comment) => <CommentCard {...comment} />)}
        </div>
      </PostCard>

      { modalPost && <ModalEdit modal={modalPost} setModal={setModalPost} {...modalPostData} editAction={editPostDetailAction} />}

    </div>
  );
}

export default DetailPost;