import P from 'parsimmon';
import { NbtTagToken, ScoreTagToken } from '../types/tokens';
import { optionallyQuotedString, quotedString } from '../stringUtils';

export const nbtTagContent: P.Parser<NbtTagToken> = P.seq(
    P.string('nbt:'),
    P.alt(
        P.string('block'),
        P.string('entity'),
        P.string('storage'),
    ).skip(P.string(':')),
    optionallyQuotedString.skip(P.string(':')), // id
    optionallyQuotedString, // path
    P.seq(
        P.string(':'),
        quotedString
    ).times(0, 1),
    P.string(':interpret').times(0, 1),
).map(([, dataSource, id, path, firstOpt, secondOpt]) => {
    const token: any = { type: 'nbt', dataSource, id, path }
    console.log(firstOpt)
    if (firstOpt?.[0]?.length === 2) {
        token.separator = firstOpt[0][1]
    }
    if (secondOpt.length === 1) {
        token.interpret = true
    } else {
        token.interpret = false
    }
    return token as NbtTagToken
})

export const scoreTagContent: P.Parser<ScoreTagToken> = P.seq(
    P.string('score:'),
    optionallyQuotedString,
    P.string(':'),
    optionallyQuotedString
).map(([, name, , objective]) => ({ type: 'score', name, objective }))