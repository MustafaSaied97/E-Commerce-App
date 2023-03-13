import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
export default function CustomToast(props) {
    const [show, setShow] = useState(false);

    return (
        <div >
          <span onClick={() => setShow(true)} >
            {props.children}
          </span>
          <div className={props.className?props.className:" position-fixed bottom-0 end-0 m-2"} style={{zIndex:"1000"}}>
            <Toast onClose={() => setShow(false)} show={show} delay={props.delay?props.delay:'3000'} autohide bg={props.bg?props.bg:'primary'}>

              {props.header?
                <Toast.Header>
                  <strong className="me-auto">{props.header}</strong>
                  {/* <small>11 mins ago</small> */}
                </Toast.Header>
                :
                ''
              }

              {props.body?
                <Toast.Body>{props.body}</Toast.Body>
                :
                ''
              }

            </Toast>
          </div>
        </div>
    );
  }
