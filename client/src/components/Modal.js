import React from 'react';
import ReactDOM  from 'react-dom';


/** PORTALS allow a component to render an html element or component not as a direct child, instead, 
 * as s child of some other element inside out HTML hirachy, most commonly, the body.
 * We make sure this modal or elements inside ReactDOM.createPortal() are rendered directly on our html body 
 * element as opposed to being nested inside a component that needs to use the modal, we give ReactDOM.createPortal
 * a sencond argument which should be a reference to a DIV we should create inside d body of public/index.html
 * onClick() is added to d grey backgroup div of our modal in other to remove d modal from screen by moving to a new
 * route whenever a user clicks anywhere on the div. I have also added an onClick() to d modal div itself in other 
 * to stop event propagation/bubbling to take place when d actual modal div is clicked, it will bubble d event to d
 * parent div (d modal background div) which is listening for a click event also which removes d modal from screen */

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={ props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e)=> e.stopPropagation()} className="ui standard modal visible active">
                <i onClick={ props.onDismiss} className="close icon"></i>
                <div className="header">{props.title}</div>
                <div className="content">
                   { props.content }
                </div>
                <div className="actions">
                    { props.actions }
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}; 

export default Modal;