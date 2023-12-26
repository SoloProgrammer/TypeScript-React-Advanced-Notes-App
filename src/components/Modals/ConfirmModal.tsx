import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Stack,
} from "react-bootstrap";

type ConfirmModalProps = {
  title: string;
  desc: string;
  show: boolean;
  btnText: string;
  handleCloseModal: () => void;
  handleConfirm: () => void;
};

const ConfirmModal = ({
  title,
  desc,
  btnText,
  show,
  handleCloseModal,
  handleConfirm,
}: ConfirmModalProps) => {
    
  return (
    <>
      <Modal  show={show} onHide={handleCloseModal}>
        <ModalHeader closeButton>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>{desc}</p>
          <Stack direction="horizontal" className="justify-content-end" gap={2}>
            <Button size="sm" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleConfirm()}
            >
              {btnText}
            </Button>
          </Stack>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmModal;
