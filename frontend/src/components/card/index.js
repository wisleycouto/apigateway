import React from 'react';
import { CardStyle } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../avatar';
import Button from '../button';

const HeartImg = <FontAwesomeIcon icon={faHeart} />
const ShareAltImg = <FontAwesomeIcon icon={faShareAlt} />


function Card (props) {
    const disabled = props.disabled || false;
    const header = props.header || false;
    const content = props.content || false;
    const footer = props.footer || false;

    return (
        <CardStyle> 
            <div className="col-sm-6 col-md-4 col-lg-3">
                <div className={`br-card  ${disabled ? "disabled" : "" } `} >
                    {
                        header ?
                            <CardHeader {...header} />
                        :
                            ""
                    }

                    {
                        content ?
                            <CardContent {...content} />
                        :
                            ""
                    }
                    {
                        footer ?
                            <CardFooter {...footer} />
                        :
                            ""
                    }
                </div>
            </div>
        </CardStyle>
    );
}

function CardHeader (props) {
    const imagem = props.imagem || false;

    return (
        <div className="card-header">           
            {
                imagem ? 
                    <Avatar
                        tipoAvatar="card"                           
                        imagem={imagem}                                                        
                        nome={props.titulo}
                        descricao={ props.descricao}
                    />
                :
                    ""
            }                         
        </div>
    );
}

function CardContent (props) {
    const imagem = props.imagem || false;
    const imagemTitle = props.imagemDescricao || false;
    const descricao = props.descricao || false;

    return (
        <div className="card-content">
            {
                imagem ? 
                    <img src={imagem} alt={imagemTitle} />
                :
                    ""
            }
            {
                descricao ?
                    <p>descricao</p>
                :
                    ""
            }
        </div>
    );
}

function CardFooter (props) {
    const Botao = props.botaoTitulo || false;
    const SocialButton = props.botaoSocial || false;

    return (
        <div className="card-footer">
            <div className="d-flex">
                {
                    Botao ?
                        <div>
                            <Button
                                background="primary"
                                inverted={true}         
                                titulo={Botao}
                            />
                        </div>
                    :
                        ""
                }
                {
                    SocialButton ?
                        <div className="ml-auto">
                            <Button
                                ico={HeartImg}
                            />
                            <Button       
                                ico={ShareAltImg}
                            />
                        </div>
                    :
                        ""
                }
            </div>
        </div>
    );
}


export default Card;