import React from "react";
import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import clsx from "clsx";

function ModalView(props) {
  const {
    size = "small",
    openModal,
    toggleModal,
    headerContent,
    headerClassNames,
    contentClassNames,
    content,
    showHeader = true,
    showActions = true,
    actionClassNames,
    showPositiveButton = false,
    onPositiveButtonClick,
    positiveButtonLabel,
    positiveButtonClassName,
    showNegativeButton = false,
    onNegativeButtonClick,
    NegativeButtonLabel,
    NegativeButtonClassName
  } = props;

  return (
    <Modal
      onClose={() => toggleModal(false)}
      onOpen={() => toggleModal(true)}
      open={openModal}
      size={size}>
      {showHeader && (
        <Modal.Header className={clsx(headerClassNames)}>{headerContent}</Modal.Header>
      )}
      <Modal.Content className={clsx(contentClassNames)}>{content}</Modal.Content>
      {showActions && (
        <Modal.Actions className={clsx(actionClassNames)}>
          {showPositiveButton && (
            <Button
              primary
              onClick={onPositiveButtonClick}
              className={clsx(positiveButtonClassName)}>
              {positiveButtonLabel}
            </Button>
          )}
          {showNegativeButton && (
            <Button
              negative
              onClick={onNegativeButtonClick}
              className={clsx(NegativeButtonClassName)}>
              {NegativeButtonLabel}
            </Button>
          )}
        </Modal.Actions>
      )}
    </Modal>
  );
}

export default ModalView;

ModalView.propTypes = {
  openModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  headerContent: PropTypes.any,
  headerClassNames: PropTypes.string,
  contentClassNames: PropTypes.string,
  content: PropTypes.any.isRequired,
  showHeader: PropTypes.bool,
  showActions: PropTypes.bool,
  actionClassNames: PropTypes.string,
  showPositiveButton: PropTypes.bool,
  onPositiveButtonClick: PropTypes.func,
  positiveButtonLabel: PropTypes.string,
  positiveButtonClassName: PropTypes.string,
  showNegativeButton: PropTypes.bool,
  onNegativeButtonClick: PropTypes.func,
  NegativeButtonLabel: PropTypes.string,
  NegativeButtonClassName: PropTypes.string
};
