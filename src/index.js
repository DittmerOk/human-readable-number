module.exports = function toReadable (number) {
     
          if (number === 0) return 'zero';

          var ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
          var TENS = ['', '', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
          var SCALE = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];

          // Return string of first three digits, padded with zeros if needed
          function get_first(str) {
              return ('000' + str).substr(-3);
          }

          // Return string of digits with first three digits chopped off
          function get_rest(str) {
              return str.substr(0, str.length - 3);
          }

          // Return string of triplet convereted to words
          function triplet_to_words(_3rd, _2nd, _1st) {
              return (_3rd == '0' ? '' : ONES[_3rd] + ' hundred ') + (_1st == '0' ? TENS[_2nd] : TENS[_2nd] && TENS[_2nd] + ' ' || '') + (ONES[_2nd + _1st] || ONES[_1st]);
          }

          // Add to words, triplet words with scale word
          function add_to_words(words, triplet_words, scale_word) {
              return triplet_words ? triplet_words + (scale_word && ' ' + scale_word || '') + ' ' + words : words;
          }

          function iter(words, i, first, rest) {
              if (first == '000' && rest.length === 0) return words;
              return iter(add_to_words(words, triplet_to_words(first[0], first[1], first[2]), SCALE[i]), ++i, get_first(rest), get_rest(rest));
          }

          return iter('', 0, get_first(String(number)), get_rest(String(number)));
      }