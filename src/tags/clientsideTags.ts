import P from 'parsimmon';
import { KeybindTagToken, SelectorTagToken, TranslationTagToken } from '../types/tokens';
import { optionallyQuotedString, quotedTokens } from '../stringUtils';

export const keyTagContent: P.Parser<KeybindTagToken> = 
    P.string('key:').then(optionallyQuotedString
    .map((key) => ({ type: 'key', key } as KeybindTagToken)))

export const langTagContent: P.Parser<TranslationTagToken> = P.alt(
    P.string('lang:'),
    P.string('tr:'),
    P.string('translate:'),
    P.string('lang_or:'),
    P.string('tr_or:'),
    P.string('translate_or:'),
).chain((name) => {
    return P.seq(
        optionallyQuotedString,
        P.string(':').then(quotedTokens).atLeast(name.endsWith('_or:') ? 1 : 0)
    ).map(([key, replacements]) => {
        const token: any = { type: 'lang', key, replacements }
        if (name.endsWith('_or:')) {
            token.fallback = replacements.shift()
        }
        return token as TranslationTagToken
    })
})

export const selectorTagContent: P.Parser<SelectorTagToken> = P.alt(
    P.string('selector:'),
    P.string('sel:')
).then(P.seq(
    optionallyQuotedString,
    P.seq(
        P.string(':'),
        optionallyQuotedString
    ).times(0, 1)
).map(([selector, separator]) => ({ type: 'selector', selector, separator: separator?.[0]?.[1] ?? undefined } as SelectorTagToken)))