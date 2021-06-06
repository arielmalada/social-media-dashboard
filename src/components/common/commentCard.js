import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Avatar from "react-avatar";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Card, CardBody, CardText, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { deleteComment, editComment } from "../../services/comments";
import { deletePostCommentAction, editPostCommentAction } from "../../store/actions/postDetail";

const CommentCard = (props) => {
  const dispatch = useDispatch();
  const { name: commentUserName, email: commentUserMail, body: commentBody, id: commentId, postId } = props;
  const { register: registerCard, handleSubmit: handleSubmitCard } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: "",
    validateCriteriaMode: "all",
    submitFocusError: true,
    nativeValidation: false,
  });
  const [editCommentState, setEditCommentState] = useState(false);
  const onSubmit = async (id, data) => {
    const dataRes = {
      postId: postId,
      id: commentId,
      name: commentUserName,
      email: commentUserMail,
      ...data
    }
    return editComment(id, dataRes).then(
      (res) => {
        setEditCommentState(false);
        return dispatch(editPostCommentAction(id, res.data));
      }
    ).catch(
      (error) => console.log(error)
    )

  }
  const deleteCommentPost = (id) => deleteComment().then(
    (res) =>
      dispatch(deletePostCommentAction(id))
  ).catch(
    (error) => console.log(error)
  )

  return (
    <div className="d-flex my-2">
      <Avatar name={commentUserMail} round className="mr-2" size="48" />
      <div className="w-100">
        <Card>
          <CardBody>
            <CardTitle className="font-weight-bold">
              {commentUserName}
            </CardTitle>
            <CardText>
              {
                !editCommentState ?
                  commentBody :
                  <form className="form-inline" onSubmit={handleSubmitCard((data) => onSubmit(commentId, data))}>
                    <textarea {...registerCard("body")} defaultValue={commentBody} className="form-control w-100" placeholder="what's on your mind" />
                    <div className="d-flex flex-row-reverse flex-grow w-100 m-2">
                      <button type="submit" className="btn btn-primary mx-2">Post</button>
                      <button className="btn btn-danger mx-2" onClick={() => setEditCommentState(false)}>Cancel</button>
                    </div>
                  </form>
              }
            </CardText>
          </CardBody>
        </Card>
      </div>
      <div className="d-flex align-items-center ml-3">
        <UncontrolledDropdown>
          <DropdownToggle color="link">
            <FontAwesomeIcon icon={faEllipsisH} size="xs" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => setEditCommentState(true)}>Edit</DropdownItem>
            <DropdownItem onClick={() => deleteCommentPost(commentId)}>Delete</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  )
}

export default CommentCard;