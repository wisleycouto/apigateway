import React from 'react';
import "./styles.css"

import ReactLoading from 'react-loading';
import {Modal} from 'react-bootstrap';

function Loading(props) {
    let showModal = props.showModal || false;

    return (

        <Modal
            size="sm"
            show={showModal}
            centered
            // className="modal d-flex justify-content-center align-items-center"
        >
            <div className=''>
                <ReactLoading className='m-auto' type="spinningBubbles" color="#5AB1F2"/>
                <div className='font-weight-bold' style={{color:"#5AB1F2"}}>Carregando . . .</div>
            </div>
        </Modal>
    )
}

export default Loading;