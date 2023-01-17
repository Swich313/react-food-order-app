import ReactDOM from "react-dom";

import styles from './Modal.module.css';

const BackDrop = props => {
    return <div className={styles.backdrop} onClick={props.onClick}></div>
};

const ModalOverLay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
};

const Modal = props => {
    const portalElement = document.getElementById('overlays');
        return (
        <>
            {ReactDOM.createPortal(<BackDrop onClick={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalElement)}
        </>
    );
};

export default Modal;