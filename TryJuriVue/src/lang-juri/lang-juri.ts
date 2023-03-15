import { parser } from './juri.js';
import { LRLanguage } from '@codemirror/language';
import { LanguageSupport } from '@codemirror/language';
import { completeFromList } from '@codemirror/autocomplete';
import { tagHighlighter, Tag, tags, styleTags } from '@lezer/highlight';

const keywords = ['fun', 'repeat', 'iterate', 'init', 'break', 'operator', 'then', 'break'];
const IF = Tag.define(tags.controlKeyword);
const ListIdentifier = Tag.define(tags.variableName);
const Parameter = Tag.define(tags.variableName);
const LiteralCharList = Tag.define(tags.string);

const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      if: IF,
      ListIdentifier: ListIdentifier,
      LiteralCharList: LiteralCharList,
      fun: tags.keyword,
      iterate: tags.keyword,
      repeat: tags.keyword,
      break: tags.keyword,
      init: tags.keyword,
      as: tags.keyword,
      to: tags.keyword,
      then: tags.keyword,
      return: tags.keyword,
      skip: tags.keyword,
      cry: tags.keyword,
      operator: tags.keyword,
      Operator: tags.operatorKeyword,
      Identifier: tags.name,
      Parameter: Parameter,
      LineComment: tags.lineComment,
      Number: tags.number,
      '( ) [ ]': tags.paren,
    }),
  ],
});

const juriLang = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: '#' },
  },
});

type kw = {
  label: string;
  type: string;
};
const mappedKW = keywords.reduce(
  (acc: kw[], curr) => [...acc, { label: curr, type: 'keyword' }],
  [],
);
const autocompletion = juriLang.data.of({
  autocomplete: completeFromList([
    ...mappedKW,
    { label: 'print', type: 'function' },
    { label: 'input', type: 'function' },
  ]),
});

export function juri() {
  return new LanguageSupport(juriLang, [autocompletion]);
}

export const juriTagHighlighter = tagHighlighter([
  {
    tag: IF,
    class: 'if',
  },
  { tag: ListIdentifier, class: 'listIdentifier' },
  { tag: LiteralCharList, class: 'literalCharList' },
  { tag: Parameter, class: 'parameter' },
  { tag: tags.number, class: 'number' },
  { tag: tags.operator, class: 'operator' },
  { tag: tags.keyword, class: 'keyword' },
  { tag: tags.paren, class: 'parenthesis' },
  { tag: tags.comment, class: 'comment' },
]);

export const highlightStyle = [
  { tag: IF, color: '#FF6450' },
  { tag: ListIdentifier, color: '#FFC878' },
  { tag: LiteralCharList, color: 'aa5500' },
  { tag: Parameter, color: '#cfc' },
  { tag: tags.number, color: '#efa' },
  { tag: tags.operator, color: '#64FFFF' },
  { tag: tags.keyword, color: '#00C8FF' },
  { tag: tags.paren, color: '#bbf' },
  { tag: tags.comment, color: '#969696', fontStyle: 'italic' },
];
