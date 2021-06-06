import { faEllipsisV, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { Card, CardBody, CardText, CardTitle, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { deletePost } from "../../services/post";
import { deleteUserPostsAction } from "../../store/actions/userDetail";

const PostCard = (props) => {
  const { 
    name, 
    userId, 
    id, 
    title, 
    body, 
    setModal, 
    setModalData, 
    className ='',
    deletePost
  } = props;  
  const editUserPost = (id, title, body) => {
    setModal(true);
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
    <Card className={className}>
      <CardBody>
        <div className="float-right">
          <UncontrolledDropdown>
            <DropdownToggle color="link">
              <FontAwesomeIcon icon={faEllipsisV} size="xs" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => editUserPost(id, title, body)}>Edit</DropdownItem>
              <DropdownItem onClick={() => deletePost(id)}>Delete</DropdownItem>
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
        <CardText className="font-weight-bold">{title}</CardText>
        <CardText>{body}</CardText>
        {props.children}
      </CardBody>
    </Card>
  );
}

export default PostCard;