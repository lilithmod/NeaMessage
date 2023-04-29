import P from 'parsimmon';
import { ResetTagToken, TextToken } from '../types/tokens';

export const resetTagContent: P.Parser<ResetTagToken> =
    P.alt(
        P.string('reset'),
    ).map((type) => ({ type }));

export const unknownTagContent: P.Parser<TextToken> = P.regexp(/[^>]*/, 0).map((tag) => ({ type: 'text', text: `<${tag}>` }));