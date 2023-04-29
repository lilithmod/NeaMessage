import P from 'parsimmon';
import { component } from './core';

export const nonQuotedString = P.regexp(/^[^<>:]*/)

export const quotedString = P.alt(
    P.string('"'),
    P.string('\''),
).chain((quote) => {
    return P.regexp(quote === '"'
        ? /(?:(?<=\\)"|[^"\\])*/
        : /(?:(?<=\\)'|[^'\\])*/)
        .skip(P.string(quote));
});


export const optionallyQuotedString = P.alt(
    quotedString,
    nonQuotedString
)

export const quotedTokens = quotedString.map((text) => {
    return P.lazy(() => component).tryParse(text)
})