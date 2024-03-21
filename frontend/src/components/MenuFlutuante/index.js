import React, {Component} from 'react';
import logoGov from '../../assets/img/logo_govbr.png'
import {render} from "react-dom";


const MenuFlutuante = () => {

    return (
        <div className="br-menu" id="main-navigation" style={{position: 'relative', zIndex: 1000}}>
            <div className="menu-container">
                <div className="menu-panel col-sm-4 col-lg-3">
                    <div className="menu-header">
                        <div className="menu-title">
                            <a href="/">
                                <img src={logoGov} width={"70px"} alt="Imagem ilustrativa"/>
                            </a>
                            <span>&nbsp;&nbsp; Gateway Olinda</span>
                        </div>
                        <div className="menu-close">
                            <button className="br-button circle" type="button" aria-label="Fechar o menu"
                                    data-dismiss="menu"><i className="fas fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <nav className="menu-body">
                        <div className="menu-folder">
                            <ul>
                                <li>
                                    <a className="menu-item" href="/">
                                        <span className="icon">
                                            <i className="fas fa-home" aria-hidden="true"></i>
                                        </span>
                                        <span className="content">Home</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="menu-folder drop-menu">
                            <a className="menu-item" href="#">
                                <span className="icon">
                                    <i className="fas fa-users" aria-hidden="true"></i>
                                </span>
                                <span className="content">Consumidores</span></a>
                            <ul>
                                <li>
                                    <a className="menu-item" href="/lista-consumidores">
                                        <span className="icon">
                                            <i className="fas fa-clipboard-list" aria-hidden="true"></i>
                                        </span>
                                        <span className="content">Listar</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu-item" href="/cadastro-consumidores">
                                        <span className="icon">
                                            <i className="fas fa-plus-circle" aria-hidden="true"></i>
                                        </span>
                                        <span className="content">Cadastrar</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="menu-folder drop-menu">
                            <a className="menu-item" href="#">
                                <span className="icon">
                                    <i className="fas fa-scroll" aria-hidden="true"></i>
                                </span>
                                <span className="content">Serviços</span>
                            </a>
                            <ul>
                                <li>
                                    <a className="menu-item" href="/listar-servicos">
                                        <span className="icon">
                                            <i className="fas fa-clipboard-list" aria-hidden="true"></i>
                                        </span>
                                        <span className="content">Listar</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu-item" href="/cadastro-servicos">
                                        <span className="icon">
                                            <i className="fas fa-plus-circle" aria-hidden="true"></i>
                                        </span>
                                        <span className="content">Cadastrar</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="menu-folder drop-menu">
                            <a className="menu-item" href="#">
                                <span className="icon">
                                    <i className="fas fa-cogs" aria-hidden="true"></i>
                                </span>
                                <span className="content">Permissão</span>
                            </a>
                            <ul>
                                <li>
                                    <a className="menu-item" href="/listar-ips">
                                        <span className="icon">
                                            <i className="fas fa-clipboard-list" aria-hidden="true"></i>
                                        </span>
                                        <span className="content">Listar</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="menu-scrim" data-dismiss="menu" tabIndex="0"></div>
            </div>
        </div>
    )

}
export default MenuFlutuante;
