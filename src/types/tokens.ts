export type TextToken = {
    type: 'text'
    text: string
}

export type TagClosingToken = {
    type: 'closing'
    tag: string
}

// base properties

/** Color Tag - text color
 * <_colorNameOrHex_> or <color:_colorNameOrHex_>
 * Looks like <red>, <#FD3CFC>, <color:blue>, <color:#00FF00>
 */
export type ColorTagToken = {
    type: 'color'
    color: string
}
/** Decoration Tag - text decoration
 * <_decorationname_[:false]> or <!_decorationname_> (! means disabled)
 * Looks like <bold>, <italic>, <underlined>, <strikethrough>, <obfuscated>
 */
export type DecorationTagToken = {
    type: 'decoration'
    name: string
    enabled: boolean
}
/** Insertion Tag - shift-right-click text
 * <insert:_text_>
 * Looks like <insert:foo>
 */
export type InsertionTagToken = {
    type: 'insert'
    insertion: string
}
/** Font Tag - text font
 * <font:key>
 * Looks like <font:minecraft:default>, <font:alt>
 */
export type FontTagToken = {
    type: 'font'
    value: string
}

// color interpolation

/** Rainbow Tag - text color rainbow
 * <rainbow:[!][phase]> (! means inverted)
 * Looks like <rainbow>, <rainbow:2>, <rainbow:!1>
 */
export type RainbowTagToken = {
    type: 'rainbow'
    inverted: boolean
    phase?: number
}
/** Gradient Tag - text color gradient
 * Gradient for each character
 * <gradient:[color1]:[color...]:[phase]>
 * Looks like <gradient:#5e4fa2:#f79459>, <gradient:#5e4fa2:#f79459:2>, <gradient:green:blue>
 * Solid color transition determined by phase
 * <transition:[color1]:[color...]:[phase]>
 * Looks like <transition:#00ff00:#ff0000:0>
 */
export type GradientTagToken = {
    type: 'gradient' | 'transition'
    colors: string[]
    phase?: number
}

// click and hover events

/** Click Tag - click event
 * <click:_action_:_value_>
 * Looks like <click:open_url:https://google.com>, <click:run_command:/say hi>
 */
export type ClickTagToken = {
    type: 'click'
    action: string
    value: string
}
/** Hover Tag - hover event
 * <hover:_action_:_value_>
 * Looks like <hover:show_text:"<gold>hi">, <hover:show_item:stone:1}>
 */
export type HoverTagToken = {
    type: 'hover'
    action: 'show_text'
    value: Token[]
} | {
    type: 'hover'
    action: 'show_item'
    value: {
        type: string
        count?: number
        tag?: string
    }
} | {
    type: 'hover'
    action: 'show_entity'
    value: {
        type: string
        uuid: string
        name?: Token[]
    }
}

// clientside data

/** Keybind Tag - keybind
 * <key:_key_>
 * Looks like <key:key.inventory>
 */
export type KeybindTagToken = {
    type: 'key'
    key: string
}
/** Translation Tag - translation
 * <lang:_key_:_value1_:_value2_...>
 * <lang_or:_key_:_fallback_:_value1_:_value2_...>
 * Looks like <lang:gui.done>, <lang:gui.done:"<red>Done">
 */
export type TranslationTagToken = {
    type: 'lang'
    key: string
    fallback?: Token[]
    replacements: Token[][]
}

/** Selector Tag - selector
 * <selector:_selector_[:_separator_]>
 * Looks like <selector:@a>, <selector:@a[distance=..5]>
 * @see https://minecraft.fandom.com/wiki/Target_selectors
 */
export type SelectorTagToken = {
    type: 'selector'
    selector: string
    separator?: string
}

// serverside data

/** Score Tag - scoreboard value
 * <score:_name_:_objective_>
 * Looks like <score:foo:bar>
 * @see https://minecraft.fandom.com/wiki/Scoreboard
 */
export type ScoreTagToken = {
    type: 'score',
    name: string
    objective: string
}
/** NBT Tag - NBT value
 * <nbt:block|entity|storage:id:path[:_separator_][:interpret]>
 * @see https://docs.advntr.dev/minimessage/format.html#nbt
 * @see https://minecraft.fandom.com/wiki/Commands/data
 */
export type NbtTagToken = {
    type: 'nbt',
    dataSource: 'block' | 'entity' | 'storage',
    id: string
    path: string
    separator?: string
    interpret: boolean
}


// misc
/** Reset Tag - reset formatting
 * <reset>
 * Looks like <reset>
 * @see https://minecraft.fandom.com/wiki/Formatting_codes#Reset
 */
export type ResetTagToken = {
    type: 'reset'
}


export type Token = TextToken | TagClosingToken | ColorTagToken | DecorationTagToken | InsertionTagToken | FontTagToken | RainbowTagToken | GradientTagToken | ClickTagToken | HoverTagToken | KeybindTagToken | TranslationTagToken | SelectorTagToken | ScoreTagToken | NbtTagToken | ResetTagToken