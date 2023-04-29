import P from 'parsimmon';
import { Token } from './types/tokens';
import { tag } from './tag';

const text = P.regexp(/^[^<]+/).map((text) => ({ type: 'text', text }));

export const component: P.Parser<Token[]> = P.alt(tag, text)
    .many()
    .map(components => {
        return components as Token[];
    });