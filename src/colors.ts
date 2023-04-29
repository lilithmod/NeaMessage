import P from 'parsimmon';

export const hexColor = P.regex(/^#[0-9a-fA-F]{6}/);
export const namedColor = P.alt(
    P.string('black'),
    P.string('dark_blue'),
    P.string('dark_green'),
    P.string('dark_aqua'),
    P.string('dark_red'),
    P.string('dark_purple'),
    P.string('gold'),
    P.string('gray'),
    P.string('dark_gray'),
    P.string('blue'),
    P.string('green'),
    P.string('aqua'),
    P.string('red'),
    P.string('light_purple'),
    P.string('yellow'),
    P.string('white'),
    P.string('dark_grey').result('dark_gray'),
    P.string('grey').result('gray')
);

const anyColor = P.alt(
    namedColor,
    hexColor
);

export default anyColor