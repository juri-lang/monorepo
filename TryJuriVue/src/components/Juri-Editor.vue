<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '62dvh' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    :auto-destroy="true"
    @ready="handleReady"
    @change="saveCode($event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script setup lang="ts">
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { ref, shallowRef } from 'vue';
import { juri, juriTagHighlighter } from '../lang-juri/lang-juri';
import { Codemirror } from 'vue-codemirror';
import { syntaxHighlighting } from '@codemirror/language';
import '../lang-juri/juri-highlight.css';

const code = ref(localStorage.getItem('code') || '');

const saveCode = (code: string): void => {
  localStorage.setItem('code', code);
  console.log('Safed code:', localStorage.getItem('code'));
};

const theme = EditorView.theme({
  '& *': {
    fontFamily: 'JetBrains Mono Regular',
    fontVariantLigatures: 'normal',
  },
  '.cm-activeLine, .cm-gutters, .cm-activeLineGutter': {
    background: 'transparent',
  },
  '&.cm-editor.cm-focused': {
    outline: '1px solid rgba(255,255,255,0.1)',
  },
  '&.cm-editor': {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '10px',
  },
  '.cm-cursor': {
    borderLeftColor: '#0f0',
  },
});

// Codemirror EditorView instance ref
const view = shallowRef();

//TODO: Fix typing
const handleReady = (payload: any) => {
  view.value = payload.view;
};
const extensions = [
  basicSetup,
  juri(),
  syntaxHighlighting(juriTagHighlighter),
  EditorView.lineWrapping,
  theme,
];

const log = console.log;
</script>
