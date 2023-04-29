import P from 'parsimmon';
import { GradientTagToken, RainbowTagToken, TagClosingToken } from '../types/tokens';
import anyColor from '../colors';

export const rainbowTagContent: P.Parser<RainbowTagToken | TagClosingToken> = P.alt(
    P.seq(
        P.string("rainbow"),
        P.seq(
            P.string(':'),
            P.string('!').times(0, 1),
            P.digits.times(0, 1)
        ).times(0, 1)
    ).map(([, result]) => {
        if (result.length === 0) {
            return {
                type: 'rainbow',
                inverted: false
            }
        }
        const inverted = result[0][1].length === 1
        if (result[0][2][0] === '') {
            return {
                type: 'rainbow',
                inverted
            }
        } else {
            return {
                type: 'rainbow',
                inverted,
                phase: Number(result[0][2][0])
            }
        }

    }),
    P.string('/rainbow').map(() => ({ type: 'closing', tag: 'rainbow' }))
)

export const gradientTagComponent: P.Parser<GradientTagToken | TagClosingToken> = P.alt(
    P.seq(
        P.alt(
            P.string("gradient"),
            P.string("transition")
        ),
        P.seq(
            P.string(':'),
            anyColor
        ).many(),
        P.string(':').then(P.regexp(/-?[\d.]+/)).times(0, 1)
    ).map(([type, colors, phaseArray]) => {
        return {
            type: type,
            colors: colors.length === 1 ? ['white', 'black'] : colors.map((color) => color[1]),
            phase: phaseArray.length === 0 ? undefined : Number(phaseArray[0])
        }
    }),
    P.string('/gradient').map(() => ({ type: 'closing', tag: 'gradient' } as TagClosingToken)),
    P.string('/transition').map(() => ({ type: 'closing', tag: 'transition' } as TagClosingToken))
)