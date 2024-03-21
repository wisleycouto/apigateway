import React from 'react';
import ReactLoading from "react-loading";

import {LoaderDiv} from './style/style';

export default function PreLoader(props)
{

    let loading = props.loading ? props.loading : null;

    return(
        <LoaderDiv loading={loading}>
            <ReactLoading type={'spin'} color={'gray'} height={200} width={150} />
        </LoaderDiv>
    );
}

