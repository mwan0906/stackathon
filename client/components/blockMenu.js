import React from 'react';
import { connect } from 'react-redux';
import { newBlockMaker } from '../store/work/actioncreators';

import { ACTION, COMPARISON, CONDITIONAL, CONJUNCTION, VALUE, MATH } from '../store/work/blocktypes'

const Menu = props => {
    console.log(props);
  return (
    <div id="menu">
      <div id="math-buttons">
        <BlockButton type={MATH} subType='PLUS' label='ADD __ + __' />
        <BlockButton type={MATH} subType='MINUS' label='SUBTRACT __ - __' />
        <BlockButton type={MATH} subType='MULT' label='MULTIPLY __ * __' />
        <BlockButton type={MATH} subType='DIV' label=' DIVIDE __ / __' />
      </div>
      <div id='value-buttons'>
        <BlockButton type={VALUE} subType='NUMBER' label='New Literal Number Block' />
        <BlockButton type={VALUE} subType='HAND' label='New Hand Block' />
        <BlockButton type={VALUE} subType='NUMBER-IN' label='New Number-In Block' />
        <BlockButton type={VALUE} subType='RANDOM' label='New Random Number Block' />
      </div>
      <div id='comparison-buttons'>
        <BlockButton type={COMPARISON} subType='EQUAL' label='New Equal Block' />
        <BlockButton type={COMPARISON} subType='NOT-EQUAL' label='New Not Equal Block' />
        <BlockButton type={COMPARISON} subType='LESS' label='New Less Than Block' />
        <BlockButton type={COMPARISON} subType='GREATER' label='New Greater Than Block' />
      </div>
      <div id='conditional-buttons'>
        <BlockButton type={CONDITIONAL} subType='IF-THEN' label='New If Block' />
        <BlockButton type={CONDITIONAL} subType='IF-THEN-ELSE' label='New If-Else Block' />
      </div>
      <div id='conjunction-buttons'>
        <BlockButton type={CONJUNCTION} subType='AND' label='New And Block' />
        <BlockButton type={CONJUNCTION} subType='OR' label='New Or Block' />
      </div>
      <div id='action-buttons'>
        <BlockButton type={ACTION} subType='HIT' label='New Hit Block' />
        <BlockButton type={ACTION} subType='STAND' label='New Stand Block' />
      </div>
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
