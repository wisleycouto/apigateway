import React, { useEffect, Fragment, useState } from "react";
import Header from "../../components/Header"
import SideBarLeft from "../../components/SidebarLeft";

function Teste () {

    const [menuPrincialOpen, setMenuPrincialOpen] = useState(false);

    const toggleMenu = () => {
        setMenuPrincialOpen(!menuPrincialOpen);
    }

    return (
        <Fragment>
            <Header setOpenMenu={toggleMenu}/>
            <main id="main" className="d-flex flex-fill">
                <div className="container-fluid">
                    <div className="row">
                        {/* <!-- Menu aqui --> */}
                        <SideBarLeft setOpenMenu={toggleMenu} activeMenu={menuPrincialOpen} />
                        {/* <!-- Coluna do conteúdo aqui --> */}
                        <div className="col">

                            <section className="bg-primary-darken-02 pl-4 pr-4 p-2 w-100">
                                <div className="row">
                                    <div className="col text-white d-flex">
                                        <i className={"fas "+props.icons+" material-icons md-36 mt-4 mb-4"}></i>
                                        <span className="h3 text-white ml-4 mt-4">{props.title}</span>
                                    </div>
                                    <div className="col-1 text-white">
                                        <button className="br-button circle mt-4 ml-sm-3" type="button" data-trigger="onboarding" data-steps="palavraChave.json" id="intro-textual" aria-label="Ícone ilustrativo">
                                            <i className="fa-2x fas fa-question-circle text-white" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <div className="br-breadcrumb mt-2 mb-2">
                                <ul className="crumb-list">
                                    <li className="crumb home">
                                        <div className="br-button circle">
                                            <span className="sr-only">
                                                <Link to="/">Página inicial</Link>
                                            </span>
                                            <i className="icon fas fa-home"></i>
                                        </div>
                                    </li>
                                    {props.breadcrumb === undefined ?
                                        ""
                                        :
                                        props.breadcrumb.map((item, index) =>
                                            <li className="crumb" key={index}>
                                                <i className="icon fas fa-chevron-right"></i>
                                                {(props.breadcrumb.length - 1) === index ?
                                                    <span>{item.nome}</span> :
                                                    <Link to={item.link}>{item.nome}</Link>
                                                }
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>

                            <div id="main-content" className="main-content">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}

export default Teste;