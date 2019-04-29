const ops = {
  'PLUS': '+',
  'MINUS': '-',
  'MULTIPLY': '*',
  'DIVIDE': '/',
  'EQUAL': '==',
  'NOT-EQUAL': '!=',
  'AND': '&&',
  'OR': '||',
  'GREATER-THAN': '>',
  'LESS-THAN': '<'
}

const parseBlock = (b, context) => {
  if (!b) return 'ERROR!!';
  let toReturn = '';
  const block = context[b];
  switch (block.subType) {
    case 'PLUS':
    case 'MINUS':
    case 'MULTIPLY':
    case 'DIVIDE':
    case 'EQUAL':
    case 'NOT-EQUAL':
    case 'GREATER-THAN':
    case 'LESS-THAN':
    case 'AND':
    case 'OR':
      toReturn += '(';
      toReturn += parseBlock(block.children[0], context);
      toReturn += ops[block.subType];
      toReturn += parseBlock(block.children[1], context);
      toReturn += ')';
      break;

    case 'NUMBER':
      toReturn += document.getElementById(`${block.id}-0`).value;
      break;
    case 'HAND':
      toReturn += ' handValue ';
      break;
    case 'NO-ACES':
      toReturn += ' withoutAces ';
      break;
    case 'NUMBER-IN':
      const suit = document.getElementById(`${block.id}-0`).value;
      let singularSuit;
      if (['Aces', 'Jacks', 'Queens', 'Kings'].includes(suit)) {
        singularSuit = suit.slice(0, -1).toUpperCase();
      } else if (suit === 'Twos') singularSuit = '2';
      else if (suit === 'Threes') singularSuit = '3';
      else if (suit === 'Fours') singularSuit = '4';
      else if (suit === 'Fives') singularSuit = '5';
      else if (suit === 'Sixes') singularSuit = '6';
      else if (suit === 'Sevens') singularSuit = '7';
      else if (suit === 'Eights') singularSuit = '8';
      else if (suit === 'Nines') singularSuit = '9';
      else if (suit === 'Tens') singularSuit = '10';

      const place = document.getElementById(`${block.id}-1`).value;
      if (place === 'My Hand')
        toReturn += ` hand.filter(card => card.value == \'${singularSuit}\').length `;
      else if (place === "Opponent's Visible Cards")
        toReturn += ` otherCards.filter(card => card.value == \'${singularSuit}\').length `;
      else if (place === 'The Deck')
        toReturn += ` unaccountedFor[\'${singularSuit}\'] `;
      else if (place === 'All Cards Seen So Far')
        toReturn += ` (4 - unaccountedFor[\'${singularSuit}\']) `;
      break;
    case 'RANDOM':
      toReturn += '( Math.floor(Math.random() * ';
      toReturn += parseBlock(block.children[0], context);
      toReturn += ') + ';
      toReturn += parseBlock(block.children[1], context);
      toReturn += ')';
      break;

    case 'IF-THEN-ELSE':
    case 'IF-THEN':
      toReturn += 'if (';
      toReturn += parseBlock(block.children[0], context);
      toReturn += ') {';
      toReturn += parseBlock(block.children[1], context);
      toReturn += '}';
      if (block.subType === 'IF-THEN') break;

      toReturn += ' else {';
      toReturn += parseBlock(block.children[2], context);
      toReturn += '}';
      break;

    case 'HIT':
      toReturn += " return 'hit'; ";
      break;
    case 'STAND':
      toReturn += " return 'stand'; ";
      break;
  }
  return toReturn;
};

export default parseBlock;
