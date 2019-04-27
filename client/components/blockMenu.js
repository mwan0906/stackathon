import React from 'react';
import { connect } from 'react-redux';
import { newBlockMaker } from '../store/work/actioncreators';

import { ACTION, COMPARISON, CONDITIONAL, CONJUNCTION, VALUE, MATH } from '../store/work/blocktypes'

const Menu = props => {
  const allowed = props.availableBlockTypes || [];
  console.log(allowed);
  return (
    <div id="menu">
      {allowed.includes(MATH) &&
        <div id="math-buttons">
        <BlockButton type={MATH} subType='PLUS' label='ADD __ + __' />
        <BlockButton type={MATH} subType='MINUS' label='SUBTRACT __ - __' />
        <br />
        <BlockButton type={MATH} subType='MULTIPLY' label='MULTIPLY __ * __' />
        <BlockButton type={MATH} subType='DIVIDE' label=' DIVIDE __ / __' />
        </div>
      }
      {allowed.includes(VALUE) &&
        <div id='value-buttons'>
        <BlockButton type={VALUE} subType='NUMBER' label='New Literal Number Block' />
        <br />
        <BlockButton type={VALUE} subType='HAND' label='New Hand Block' />
        <BlockButton type={VALUE} subType='NUMBER-IN' label='New Number-In Block' />
        <br />
        <BlockButton type={VALUE} subType='RANDOM' label='New Random Number Block' />
        </div>
      }
      {allowed.includes(CONJUNCTION) &&
        <div id='conjunction-buttons'>
        <BlockButton type={CONJUNCTION} subType='AND' label='New And Block' />
        <br />
        <BlockButton type={CONJUNCTION} subType='OR' label='New Or Block' />
        </div>
      }
      {allowed.includes(COMPARISON) &&
        <div id='comparison-buttons'>
        <BlockButton type={COMPARISON} subType='EQUAL' label='New Equal Block' />
        <BlockButton type={COMPARISON} subType='NOT-EQUAL' label='New Not Equal Block' />
        <br />
        <BlockButton type={COMPARISON} subType='LESS-THAN' label='New Less Than Block' />
        <BlockButton type={COMPARISON} subType='GREATER-THAN' label='New Greater Than Block' />
        </div>
      }
      {allowed.includes(CONDITIONAL) &&
        <div id='conditional-buttons'>
        <BlockButton type={CONDITIONAL} subType='IF' label='New If Block' />
        <br />
        <BlockButton type={CONDITIONAL} subType='IF-ELSE' label='New If-Else Block' />
        </div>
      }
      {allowed.includes(ACTION) &&
        <div id='action-buttons'>
        <BlockButton type={ACTION} subType='HIT' label='New Hit Block' />
        <br />
        <BlockButton type={ACTION} subType='STAND' label='New Stand Block' />
        </div>
      }
      {allowed.includes('DELETE') &&
        <button type='button' className='del'>DELETE</button>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    availableBlockTypes: state.work.availableBlockTypes
  };
};

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

export default connect(
  mapStateToProps
)(Menu);
