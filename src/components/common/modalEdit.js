import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import PostForm from './postForm';

const ModalEdit = (props) => {
  const { className, ...rest } = props;
  const { modal, setModal } = rest;
  const toggle = () => setModal(false);
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>Edit Post</ModalHeader>
      <ModalBody>
        <PostForm {...rest} type='edit' />
      </ModalBody>
    </Modal>
  );
}

export default ModalEdit;