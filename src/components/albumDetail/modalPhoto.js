import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalPhoto = ({modal, setModal, modalData}) => {
  const { title, url } = modalData;
  const toggle = () => setModal(false);
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody  className="text-center" >
        <img src={url} alt={title}/>
      </ModalBody>
    </Modal>
  );
}

export default ModalPhoto;