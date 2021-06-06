import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { fetchPostDetail, editPostDetailAction, addPostCommentAction } from "../../store/actions/postDetail";
import ModalEdit from "../../components/common/modalEdit";
import PostCard from "../../components/common/postCard";
import CommentCard from "../../components/common/commentCard";
import { deleteUserPostsAction } from "../../store/actions/userDetail";
import { deletePost } from "../../services/post";
import { useForm } from "react-hook-form";
import Avatar from "react-avatar";
import { addComment } from "../../services/comments";

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
  const { name, email } = { ...userData };
  const reversedComments = [...postCommentsData].reverse();

  const { register:register1, handleSubmit:handleSubmit1, reset:reset1 } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: "",
    validateCriteriaMode: "all",
    submitFocusError: true,
    nativeValidation: false,
  });
  const onSubmitData = async (data) => {
    const dataRes = {
      postId: postId,
      name: name,
      email: email,
      ...data
    }
    return addComment(dataRes).then(
      (res) => {
        reset1({ body: '' });
        return dispatch(addPostCommentAction(res.data));
      }
    ).catch(
      (error) => console.log(error)
    )

  }
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
          <div>{postCommentsData.length} Comments</div>
        </div>
        <div className="py-3">
          <form id="hook-form" onSubmit={handleSubmit1((data) => onSubmitData(data))}>
            <div className="d-flex flex-row mb-3 align-items-center">
              <div>
                <Avatar name={name} round className="mr-2" size="48" />
              </div>
              <div className="w-100">
                <input {...register1("body")} className="form-control mb-2" placeholder="add a comment" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Post</button>
          </form>
          {reversedComments.map((comment) => <CommentCard {...comment} postId={postId} />)}
        </div>
      </PostCard>

      { modalPost && <ModalEdit modal={modalPost} setModal={setModalPost} {...modalPostData} editAction={editPostDetailAction} />}

    </div>
  );
}

export default DetailPost;