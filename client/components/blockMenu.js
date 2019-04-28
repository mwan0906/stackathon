import React from 'react';
import { connect } from 'react-redux';
import { newBlockMaker, deleteBlock, logicChanger, rejectSubmit } from '../store';
import parseBlock from '../store/work/blockreader';

import {
  ACTION,
  COMPARISON,
  CONDITIONAL,
  CONJUNCTION,
  VALUE,
  MATH
} from '../store/work/blocktypes';

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

const BlockButton = connect(
  null,
  mapDispatchToProps
)(DisconnectedBlockButton);

const Menu = props => {
  const allowed = props.availableBlockTypes || [];
  return (
    <React.Fragment>
      <div id="menu">
        {allowed.includes(MATH) && (
          <div id="math-buttons">
            <BlockButton type={MATH} subType="PLUS" label="__ plus __" />
            <BlockButton type={MATH} subType="MINUS" label="__ minus __" />
            <br />
            <BlockButton type={MATH} subType="MULTIPLY" label="__ times __" />
            <BlockButton
              type={MATH}
              subType="DIVIDE"
              label="__ divided by __"
            />
          </div>
        )}
        {allowed.includes(VALUE) && (
          <div id="value-buttons">
            <BlockButton
              type={VALUE}
              subType="NUMBER-IN"
              label="Number Of (suit) In (place)"
            />
            <br />
            <BlockButton
              type={VALUE}
              subType="NUMBER"
              label="Number (1, 2, 3...)"
            />
            <BlockButton type={VALUE} subType="HAND" label="Current Hand" />
            <BlockButton
              type={VALUE}
              subType="NO-ACES"
              label="Hand Not Counting Aces"
            />
            <br />
            <BlockButton
              type={VALUE}
              subType="RANDOM"
              label="Random Number Between ... and ..."
            />
          </div>
        )}
        {allowed.includes(CONJUNCTION) && (
          <div id="conjunction-buttons">
            <BlockButton type={CONJUNCTION} subType="AND" label="__ And __" />
            <br />
            <BlockButton type={CONJUNCTION} subType="OR" label="__ Or __" />
          </div>
        )}
        {allowed.includes(COMPARISON) && (
          <div id="comparison-buttons">
            <BlockButton
              type={COMPARISON}
              subType="EQUAL"
              label="__ Equals __"
            />
            <BlockButton
              type={COMPARISON}
              subType="NOT-EQUAL"
              label="__ Does Not Equal __"
            />
            <br />
            <BlockButton
              type={COMPARISON}
              subType="LESS-THAN"
              label="__ Is Less Than __"
            />
            <BlockButton
              type={COMPARISON}
              subType="GREATER-THAN"
              label="__ Is Greater Than __"
            />
          </div>
        )}
        {allowed.includes(CONDITIONAL) && (
          <div id="conditional-buttons">
            <BlockButton
              type={CONDITIONAL}
              subType="IF-THEN"
              label="If __ Then __"
            />
            <br />
            <BlockButton
              type={CONDITIONAL}
              subType="IF-THEN-ELSE"
              label="If __ Then __ Else __"
            />
          </div>
        )}
        {allowed.includes(ACTION) && (
          <div id="action-buttons">
            <BlockButton type={ACTION} subType="HIT" label="Hit" />
            <br />
            <BlockButton type={ACTION} subType="STAND" label="Stand" />
          </div>
        )}
        {allowed.includes('DELETE') && (
          <button type="button" className="del" onClick={props.deleteBlock}>
            DELETE
          </button>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              let result = '';
              props.topBlocks.forEach(
                block => (result += parseBlock(block, props.allBlocks))
              );
              if (result.includes('ERROR!!')) {
                props.rejectSubmit();
              } else {
                props.changeLogic(result);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {props.err && (
        <h2 id="err">
          Whoops! Looks like there's an error! Make sure you've filled in all
          the blank spots before submitting!
        </h2>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    availableBlockTypes: state.work.availableBlockTypes,
    allBlocks: state.work.currentBlocks,
    topBlocks: state.work.blockOrder,
    err: state.work.err
  };
};
const mapDeleteToProps = dispatch => {
  return {
    deleteBlock: () => dispatch(deleteBlock()),
    changeLogic: rawLogic => dispatch(logicChanger(rawLogic)),
    rejectSubmit: () => dispatch(rejectSubmit())
  };
};

export default connect(
  mapStateToProps,
  mapDeleteToProps
)(Menu);
