const flattenSequence = (sequence) => sequence.flat();

const getOpenBrackets = (sequence) => {
  let openBrackets = [];
  const flatSeq = flattenSequence(sequence);
  for (let i = 0; i < flatSeq.length; i += 1) {
    if (i % 2 === 0) {
      openBrackets.push(sequence[i]);
    }
  }
  return openBrackets;
};

const getClosedBrackets = (sequence) => {
  let closedBrackets = [];
  const flatSeq = flattenSequence(sequence);
  for (let i = 0; i < flatSeq.length; i += 1) {
    if (i % 2 !== 0) {
      closedBrackets.push(sequence[i]);
    }
  }
  return closedBrackets;
};


module.exports = function check(str, bracketsConfig) {
  const flatBracketsConfig = flattenSequence(bracketsConfig);
  const openingSymbols = getOpenBrackets(flatBracketsConfig);
  const closingSymbols = getClosedBrackets(flatBracketsConfig);

  const isOpeningSymbol = (symbol) => openingSymbols.includes(symbol);
  const getClosingSymbolFor = (symbol) => closingSymbols[openingSymbols.indexOf(symbol)];

  const stack = [];
  for (const symbol of str) {
    if (isOpeningSymbol(symbol) && !stack.includes(symbol)) {
      
      const closingSymbol = getClosingSymbolFor(symbol);
      stack.push(closingSymbol);

    } else {
      const lastSavedSymbol = stack.pop();
      if (symbol !== lastSavedSymbol) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}


const config1 = [['(', ')'], ['|', '|']];
const config2 = [['(', ')'], ['[', ']']];
const config3 = [['(', ')'], ['[', ']'], ['{', '}']];

//console.log(check('|()|', config1));
// console.log(check('[]()', config2));
/* console.log(check('111115611111111222288888822225577877778775555666677777777776622222', config3)); */

// module.exports = function check(str, bracketsConfig)
// const check = (str, bracketsConfig) => 