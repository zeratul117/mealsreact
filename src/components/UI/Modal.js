import { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={() => props.onClick(false)}></div>
}

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElemnt = document.getElementById('overlays');

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElemnt)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElemnt)}
        </Fragment>
    )
}

export default Modal;