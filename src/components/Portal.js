import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
/**
 *
 * React will put the DOM nodes for the JSX passed into createPortal, inside of the DOM node the
 * createPortal is called within. Below, without the call for the portal, the second <p> would be
 * placed inside the parent <div>, but the call for the portal “teleported” the second <p> into the document.body:
 *
 * @export Portal component
 * @return {*} DOM node containing the Portal
 */

export default function Portal() {
  const [modal, setModal] = useState(false);
  return (
    <div className="portal h-full w-full">
      <button className="absolute bottom-0 left-0 m-4" onClick={() => setModal(true)}>tutorial</button>
      { modal && createPortal(
        <Modal onClose={ () => setModal(false) } />,
        document.body
      ) }
    </div>
  );
}