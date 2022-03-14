interface Highlight {
    regex: RegExp,
    color: string
}

export default class Highlighter {
    private highlights: Highlight[] = [];

    constructor(...highlights: Highlight[]) {
        highlights.forEach(e => this.add(e));
    }

    add(highlight: Highlight) {
        this.highlights.push({ regex: new RegExp(`^${highlight.regex.source}$`), color: highlight.color });
    }

    highlight(text: string) {
        let tokens = [];
        for (const token of tokenize(text)) {
            let element = <>{token}</>;
            switch (token) {
                case ' ':
                    element = <>&nbsp;</>
                    break;
                case '\n':
                    element = <br />;
                    break;
                case '\t':
                    element = <></>;
                    break;
                default:
                    for (const hl of this.highlights) {
                        if (token.match(hl.regex)) {
                            element = colorized(token, hl.color);
                            break;
                        }
                    }
                    break;
            }
            tokens.push(element);
        }
        return tokens;
    }
}

function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function colorized(text: string, color: string) {
    return <span style={{ color: color }}>{text}</span>;
}

function tokenize(text: string) {
    return text.match(/#.*|\w+|\d+|\s|:[A-Za-z]\w*|./g) || [];
}
