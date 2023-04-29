import P from 'parsimmon';
import anyColor from '../colors';
import { ColorTagToken, DecorationTagToken, FontTagToken, InsertionTagToken, TagClosingToken } from '../types/tokens';
import decorationName from '../decorations';
import { optionallyQuotedString } from '../stringUtils';

export const colorTagContent: P.Parser<ColorTagToken | TagClosingToken> = P.string('color:').times(0, 1).then(P.string('/').times(0, 1).chain((closingResult) => {
    const closing = closingResult.length === 1
    return anyColor.map(result => {
        if (closing) return { type: 'closing', tag: `color:${result}` } as TagClosingToken
        return { type: 'color', color: result } as ColorTagToken
    });
}))

export const decorationTagContent: P.Parser<DecorationTagToken | TagClosingToken> = P.string('/').times(0, 1).chain((closingResult) => {
    const closing = closingResult.length === 1

    return P.string('!').times(0, 1).chain((enabledResult) => {
        const enabled = enabledResult.length === 0

        return decorationName.map(result => {
            if (closing) return { type: 'closing', tag: `${enabled ? '' : '!'}${result}` }
            return { type: 'decoration', name: result, enabled }
        });
    })

})

export const insertTagContent: P.Parser<InsertionTagToken | TagClosingToken> = P.alt(
    P.seq(
        P.string('insert:'),
        optionallyQuotedString
    ).map(([, insertion]) => ({ type: 'insert', insertion } as InsertionTagToken)),
    P.string('/insert').map(() => ({ type: 'closing', tag: 'insert' } as TagClosingToken))
)

export const fontTagContent: P.Parser<FontTagToken | TagClosingToken> = P.alt(
    P.seq(
        P.string('font:'),
        optionallyQuotedString,
        P.string(':').then(optionallyQuotedString).times(0, 1)
    ).map(([, first, arr]) => {
        if (arr.length === 0) {
            return {
                type: 'font',
                value: first
            }
        } else {
            return {
                type: 'font',
                value: first + ':' + arr[0],
            }
        }

    }),
    P.string('/font').map(() => ({ type: 'closing', tag: 'font' } as TagClosingToken))
)