export const hiragana = [
    { sound: 'あ', chars: ['あ', 'い', 'う', 'え', 'お'] },
    { sound: 'か', chars: ['か', 'き', 'く', 'け', 'こ'] },
    { sound: 'さ', chars: ['さ', 'し', 'す', 'せ', 'そ'] },
    { sound: 'た', chars: ['た', 'ち', 'つ', 'て', 'と'] },
    { sound: 'な', chars: ['な', 'に', 'ぬ', 'ね', 'の'] },
    { sound: 'ま', chars: ['ま', 'み', 'む', 'め', 'も'] },
    { sound: 'は', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'] },
    { sound: 'や', chars: ['や', 'ゆ', 'よ'] },
    { sound: 'ら', chars: ['ら', 'り', 'る', 'れ', 'ろ'] },
    { sound: 'わ', chars: ['わ', 'を'] },
    { sound: 'ん', chars: ['ん'] },
    { sound: 'が', chars: ['が', 'ぎ', 'ぐ', 'げ', 'ご'] },
    { sound: 'ざ', chars: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'] },
    { sound: 'だ', chars: ['だ', 'ぢ', 'づ', 'で', 'ど'] },
    { sound: 'ば', chars: ['ば', 'び', 'ぶ', 'べ', 'ぼ'] },
    { sound: 'ぱ', chars: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'] },
];

export const katakana = [
    { sound: 'ア', chars: ['ア', 'イ', 'ウ', 'エ', 'オ'] },
    { sound: 'カ', chars: ['カ', 'キ', 'ク', 'ケ', 'コ'] },
    { sound: 'サ', chars: ['サ', 'シ', 'ス', 'セ', 'ソ'] },
    { sound: 'タ', chars: ['タ', 'チ', 'ツ', 'テ', 'ト'] },
    { sound: 'ナ', chars: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'] },
    { sound: 'マ', chars: ['マ', 'ミ', 'ム', 'メ', 'モ'] },
    { sound: 'ハ', chars: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'] },
    { sound: 'ヤ', chars: ['ヤ', 'ユ', 'ヨ'] },
    { sound: 'ラ', chars: ['ラ', 'リ', 'ル', 'レ', 'ロ'] },
    { sound: 'ワ', chars: ['ワ', 'ヲ'] },
    { sound: 'ン', chars: ['ン'] },
    { sound: 'ガ', chars: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'] },
    { sound: 'ザ', chars: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'] },
    { sound: 'ダ', chars: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'] },
    { sound: 'バ', chars: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'] },
    { sound: 'パ', chars: ['パ', 'ピ', 'プ', 'ペ', 'ポ'] },
];


export const romanjiMap: { [key: string]: string } = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',

    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n'
  };