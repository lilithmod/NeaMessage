import P from 'parsimmon';
import { optionallyQuotedString, quotedTokens } from '../stringUtils';
import { ClickTagToken, HoverTagToken, TagClosingToken } from '../types/tokens';

const clickEventAction = P.alt(
    P.string('open_url'),
    P.string('run_command'),
    P.string('suggest_command'),
    P.string('change_page'),
    P.string('copy_to_clipboard')
);

export const clickTagContent: P.Parser<ClickTagToken | TagClosingToken> = P.alt(
    P.seq(
        P.string("click:"),
        clickEventAction,
        P.string(':'),
        optionallyQuotedString,
    ).map(([, action, , value]) => ({ type: 'click', action, value })),
    P.string('/click').map(() => ({ type: 'closing', tag: 'click' }))
)

const hoverEventAction = P.alt(
    P.string('show_text'),
    P.string('show_item'),
    P.string('show_entity')
);

export const hoverTagContent: P.Parser<HoverTagToken | TagClosingToken> = P.alt(
    P.seq(
        P.string("hover:"),
        hoverEventAction,
        P.string(':'),
    ).chain(([, action]) => {
        if (action === 'show_text') {

            return quotedTokens.map((value) => ({ type: 'hover', action, value } as HoverTagToken))

        } else if (action === 'show_item') {

            return P.seq(
                optionallyQuotedString,
                P.seq(
                    P.string(':'),
                    P.digits
                ).times(0, 1),
                P.seq(
                    P.string(':'),
                    optionallyQuotedString
                ).times(0, 1)
            ).map(([type, [, count], [, tag]]) => {
                // @ts-ignore
                return {
                    type: 'hover', action, value: {
                        type,
                        count: count?.[1] == null ? undefined : parseInt(count[1]),
                        tag: tag ?? undefined
                    }
                } as HoverTagToken
            })

        } else {

            return P.seq(
                optionallyQuotedString,
                P.string(':'),
                optionallyQuotedString,
                P.seq(
                    P.string(':'),
                    quotedTokens
                )
            ).map(([type, , [, uuid], [, name]]) => {
                return {
                    type: 'hover', action, value: {
                        type,
                        uuid,
                        name: name
                    }
                } as HoverTagToken
            })

        }
    }),
    P.string('/hover').map(() => ({ type: 'closing', tag: 'hover' }))
)