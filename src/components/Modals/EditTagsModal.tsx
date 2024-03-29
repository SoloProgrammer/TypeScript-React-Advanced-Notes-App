import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
  Stack,
} from "react-bootstrap";
import { EditTagsModalProps, Tag } from "../../types/Notestypes";
import { FormEvent, useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";

const EditTagsModal = ({
  show,
  handleCloseModal,
  availableTags,
  deleteTag,
  updateTag,
}: EditTagsModalProps) => {
  const [availableTagsCopy, setAvailableTagsCopy] = useState<Tag[]>(
    structuredClone(availableTags)
  );

  useEffect(() => {
    setAvailableTagsCopy(availableTags);
  }, [show, availableTags]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateTag(availableTagsCopy);
    handleCloseModal();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const handleCloseConfirmModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirm = () => {
    id && deleteTag(id);
    handleCloseConfirmModal();
    handleCloseModal();
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseModal}>
        <ModalHeader closeButton>
          <ModalTitle>Edit tags</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSave}>
            <Stack gap={2}>
              {availableTagsCopy.map((tag) => {
                return (
                  <Row key={tag.id}>
                    <Col>
                      <Form.Control
                        onChange={(e) =>
                          setAvailableTagsCopy((prev) =>
                            prev.map((t) =>
                              t.id === tag.id
                                ? { ...tag, label: e.target.value }
                                : t
                            )
                          )
                        }
                        type="text"
                        defaultValue={tag.label}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        size="sm"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setId(tag.id);
                        }}
                        variant="outline-danger"
                        type="button"
                      >
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="material-symbols-outlined"
                        >
                          delete
                        </span>
                      </Button>
                    </Col>
                  </Row>
                );
              })}
            </Stack>
            <Stack className="justify-content-end" direction="horizontal">
              <Button className="mt-2" type="submit">
                Save changes
              </Button>
            </Stack>
          </Form>
        </ModalBody>
      </Modal>
      <ConfirmModal
        show={showDeleteModal}
        title="Delete tag!"
        desc="Are you sure you wnt to delete the tag?"
        btnText="delete"
        handleCloseModal={handleCloseConfirmModal}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default EditTagsModal;
