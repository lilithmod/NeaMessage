import P from 'parsimmon'
import { keyTagContent, langTagContent, selectorTagContent } from './tags/clientsideTags';
import { clickTagContent, hoverTagContent } from './tags/eventTags';
import { rainbowTagContent, gradientTagComponent } from './tags/gradientTags';
import { resetTagContent, unknownTagContent } from './tags/miscTags';
import { fontTagContent, insertTagContent, decorationTagContent, colorTagContent } from './tags/propertyTags';
import { nbtTagContent, scoreTagContent } from './tags/serversideTags';

export const tag = P.alt(
    rainbowTagContent,
    gradientTagComponent,
    fontTagContent,
    insertTagContent,
    decorationTagContent,
    colorTagContent,
    clickTagContent,
    hoverTagContent,
    keyTagContent,
    langTagContent,
    selectorTagContent,
    nbtTagContent,
    scoreTagContent,
    resetTagContent,
    unknownTagContent
).wrap(P.string('<'), P.alt(P.string('/>'), P.string('>')))
    // .map((result) => {
    //     console.log('tag', result);
    //     return result
    // });