import P from 'parsimmon';

const decorationName = P.alt(
    P.string('bold'),
    P.string('italic'),
    P.string('underlined'),
    P.string('strikethrough'),
    P.string('obfuscated'),
    P.string('b').result('bold'),
    P.string('i').result('italic'),
    P.string('em').result('italic'),
    P.string('u').result('underlined'),
    P.string('st').result('strikethrough'),
    P.string('obf').result('obfuscated')
);

export default decorationName