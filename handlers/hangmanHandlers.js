const { words } = require('../data/words');

// write your handlers here...
let playHangman = (req, res) => {
    let wordId = req.params.id;
    let letter = req.params.letter;
    let wordObject = words.find((word) => word.id === wordId);
    let word = wordObject.word;
    let wordArray = [];
    let booleanLetterArray = [];
    for (let x = 0; x < word.length; x++) {
        wordArray.push('_');
        booleanLetterArray.push(false);
    }
    let letterCheck = word.indexOf(letter);
    if (letterCheck !== -1) {
        wordArray.splice(letterCheck, 1, letter);
        booleanLetterArray.splice(letterCheck, 1, true);
        return res.status(200).json({
            status: 200,
            data: booleanLetterArray,
        })
    } else {
        res.status(200).json({
            status: 200,
            message: 'try again!',
        })
    }
}

module.exports = { playHangman };