import React from 'react';
import { AvatarStyle } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faComment, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const AvatarImg = <FontAwesomeIcon icon={faUser} />
const PhoneImg = <FontAwesomeIcon icon={faPhone} />
const CommentImg = <FontAwesomeIcon icon={faComment} /> 
const EllipsisVImg = <FontAwesomeIcon icon={faEllipsisV} />

function Avatar(props) {
    
    const tipoAvatar = props.tipoAvatar ?  props.tipoAvatar : 'default';

    return (
        <AvatarStyle>        
           {
                (tipoAvatar === 'foto'  && <AvatarFoto {...(props)} />)  ||
                (tipoAvatar === 'chat'  && <AvatarChat {...(props)} />)  || 
                (tipoAvatar === 'sigla' && <AvatarNome {...(props)} />)  ||
                (tipoAvatar === 'card'  && <AvatarCard {...(props)} />)  ||
                <AvatarDefault {...(props)} />                
            }
        </AvatarStyle>
    );
}

function AvatarDefault (props) {
    return (
        <span className="br-avatar" title={props.nome || ""}>
            <span className="image">               
                {
                    props.imagem 
                        ?
                    <img src={props.imagem} alt="Avatar"/>  
                        :
                    AvatarImg
                }                    
            </span>
        </span>
    )
}

function AvatarFoto (props) {
    return (
        <div className="br-card">
        <div className="front">
          <div className="content">
            <div className="text-center">
              <button className="br-avatar-action" type="button" data-toggle="avatar" data-target="#avatar-choose" data-visible="data-visible" aria-label="Escolher Avatar">
                   <span className="br-avatar large" title={props.nome || ""}><span className="image">
                      {
                        props.imagem 
                            ?
                        <img src={props.imagem} alt="Avatar"/>  
                            :
                        AvatarImg
                      }                     
                    </span></span>
              </button>
            </div>
            <p className="h4 text-center">Clique na imagem acima para trocar sua foto no perfil.</p><span className="feedback info" role="alert"><i className="fas fa-info-circle" aria-hidden="true"></i>Os arquivos devem ser nos formatos PNG ou JPG, e ter no máximo 100MB</span>
          </div>
        </div>
      </div>
    )
}

function AvatarChat (props) {
    return (
        <div className="br-card">
            <div className="front">
                <div className="content">
                    <div className="d-flex align-items-center">
                        <span className="br-avatar" title={props.nome || ""}>
                            <span className="image">
                                {
                                    props.imagem 
                                        ?
                                    <img src={props.imagem} alt="Avatar"/>  
                                        :
                                    AvatarImg
                                }     
                            </span>
                        </span>
                        <div className="flex-fill mx-3">
                            <div className="text-primary-default text-up-01">{ props.nome }</div>
                            <span>{ props.descricao } </span>
                        </div>
                        <div>
                            <button className="br-button circle" type="button" aria-label="Ver telefone">
                                <i className="fas" aria-hidden="true">
                                    { PhoneImg }
                                </i>
                            </button>
                            <button className="br-button circle" type="button" aria-label="Enviar comentário">
                                <i className="fas" aria-hidden="true">
                                    { CommentImg }
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AvatarNome (props) {
    return (
        <span className="br-avatar" title={props.descricao}>
            <span className="image bg-support-01 text-secondary-01">{props.nome}</span>
        </span>
    )
}

function AvatarCard (props) {
    return (       
        <div className="d-flex align-items-center">
            <span className="br-avatar" title={props.nome || ""}>
                <span className="image">
                    {
                        props.imagem 
                            ?
                        <img src={props.imagem} alt="Avatar"/>  
                            :
                        AvatarImg
                    }     
                </span>
            </span>
            <div className="flex-fill mx-3">
                <div className="text-primary-default text-up-01">{ props.nome }</div>
                <span>{ props.descricao } </span>
            </div>
            <div>
                <button className="br-button circle" type="button" aria-label="Enviar comentário">
                    <i className="fas" aria-hidden="true">
                        { EllipsisVImg }
                    </i>
                </button>
            </div>
        </div>
    )
}

export default Avatar;