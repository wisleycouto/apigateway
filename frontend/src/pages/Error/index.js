import React, { Component } from 'react';
import './Styles.css'
import Button from 'react-bootstrap/Button';
export default class Error extends Component {
    render() {
        return (
            <div className='erro'>             
                Erro 404 Página não encontrada
            
            <div>
            <a href="/">
            <Button variant="primary">Página Inicial</Button> 
                
            </a>
        </div>
        </div>
        );
    }
}
