import React from 'react';
import { connect } from 'react-redux';
import { newBlockMaker, deleteBlock } from '../store/work/actioncreators';

import {
  ACTION,
  COMPARISON,
  CONDITIONAL,
  CONJUNCTION,
  VALUE,
  MATH
} from '../store/work/blocktypes'

const DisconnectedBlockButton = props => {
  return (
    <button
      type="button"
      onClick={() => props.newBlock(props.type, props.subType)}
    >
      {props.label}
    </button>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    newBlock: (type, subType) => dispatch(newBlockMaker(type, subType))
  };
};

const BlockButton = connect(null, mapDispatchToProps)(DisconnectedBlockButton);

const Menu = props => {
  const allowed = props.availableBlockTypes || [];
  return (
    <div id="menu">
      {allowed.includes(MATH) &&
        <div id="math-buttons">
        <BlockButton type={MATH} subType='PLUS' label='Add' />
        <BlockButton type={MATH} subType='MINUS' label='Subtract' />
        <br />
        <BlockButton type={MATH} subType='MULTIPLY' label='Multiply' />
        <BlockButton type={MATH} subType='DIVIDE' label=' Divide' />
        </div>
      }
      {allowed.includes(VALUE) &&
        <div id='value-buttons'>
        <BlockButton type={VALUE} subType='NUMBER' label='Number (1, 2, 3)' />
        <br />
        <BlockButton type={VALUE} subType='HAND' label='Current Hand' />
        <BlockButton type={VALUE} subType='NUMBER-IN' label='Number Of ... In ...' />
        <br />
        <BlockButton type={VALUE} subType='RANDOM' label='Random Number Between ... and ...' />
        </div>
      }
      {allowed.includes(CONJUNCTION) &&
        <div id='conjunction-buttons'>
        <BlockButton type={CONJUNCTION} subType='AND' label='And' />
        <br />
        <BlockButton type={CONJUNCTION} subType='OR' label='Or' />
        </div>
      }
      {allowed.includes(COMPARISON) &&
        <div id='comparison-buttons'>
        <BlockButton type={COMPARISON} subType='EQUAL' label='Equal To' />
        <BlockButton type={COMPARISON} subType='NOT-EQUAL' label='Not Equal To' />
        <br />
        <BlockButton type={COMPARISON} subType='LESS-THAN' label='Less Than' />
        <BlockButton type={COMPARISON} subType='GREATER-THAN' label='Greater Than' />
        </div>
      }
      {allowed.includes(CONDITIONAL) &&
        <div id='conditional-buttons'>
        <BlockButton type={CONDITIONAL} subType='IF-THEN' label='If ... Then' />
        <br />
        <BlockButton type={CONDITIONAL} subType='IF-THEN-ELSE' label='If ... Then ... Else' />
        </div>
      }
      {allowed.includes(ACTION) &&
        <div id='action-buttons'>
        <BlockButton type={ACTION} subType='HIT' label='Hit' />
        <br />
        <BlockButton type={ACTION} subType='STAND' label='Stand' />
        </div>
      }
      {allowed.includes('DELETE') &&
        <button type='button' className='del' onClick={props.deleteBlock}>DELETE</button>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    availableBlockTypes: state.work.availableBlockTypes
  };
};
const mapDeleteToProps = dispatch => {
  return {
    deleteBlock: () => dispatch(deleteBlock())
  }
}

export default connect(
  mapStateToProps,
  mapDeleteToProps
)(Menu);
