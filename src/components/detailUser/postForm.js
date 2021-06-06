import { Card, CardBody } from "reactstrap";
import { addPost, editPost } from "../../services/post";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUserPostsAction, editUserPostsAction } from "../../store/actions/userDetail";
import Avatar from "react-avatar";

const PostForm = (props) => {
  const {name, userId, type, title='', body ='',} = props;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (id, data) => {
    switch (type) {
      case 'post' : {
        const dataRes = {
          id: id,
          ...data
        }
        return addPost(dataRes).then(
          (res) => {
            reset({title: '', body: ''})
            return dispatch(addUserPostsAction(res.data))
          }
        ).catch(
          (error) => console.log(error)
        )
      }
      case 'edit' : {
        const { postId, setModal } = props;
        setModal(false);
        return editPost(postId, data).then(
          (res) => { 
            reset({title: '', body: ''});
            return dispatch(editUserPostsAction(postId, res.data));
          }
        ).catch(
          (error) => console.log(error)
        )
      }
      default:
        return null;
        
    }
  }
  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit((data) => onSubmit(userId, data))}>
          <div className="d-flex flex-row mb-3 align-items-center">
            <div>
              <Avatar name={name} round className="mr-2" size="48" />
            </div>
            <div className="w-100">
              <input {...register("title")} defaultValue={title} className="form-control mb-2" placeholder="title" />
              <textarea {...register("body")} defaultValue={body} className="form-control" placeholder="what's on your mind" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Post</button>
        </form>
      </CardBody>
    </Card>
  );
}

export default PostForm;