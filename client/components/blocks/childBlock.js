import React from 'react';
import Block from '../blocks';

export default props => {
    if (props.seeking === props.childId) {
        return <Block blockId={props.childId} />
    }
    else {
        return <span className="blank" id={props.seeking}>{props.type}</span>
    }
}