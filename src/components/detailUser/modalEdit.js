import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PostForm from './postForm';

const ModalEdit = (props) => {
  const { className, ...rest } = props;
  const { modal, setModal } = rest;
  const toggle = () => setModal(false);
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>edit post</ModalHeader>
      <ModalBody>
        <PostForm {...rest} type='edit' />
      </ModalBody>
    </Modal>
  );
}

export default ModalEdit;