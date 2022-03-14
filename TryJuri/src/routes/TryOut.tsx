import { ChangeEvent, useState, ReactNode, useEffect } from 'react';
import '../style/App.scss';
import { Button, TextField } from '@mui/material';
import { KeyboardEvent } from 'react';
import { Theme } from '@mui/material';
import axios from 'axios';
import Highlighter from '../util/Highlighter';
import { CSSProperties } from 'react';
import internal from 'stream';


export default function TryOut({ theme }: { theme?: Theme }) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  let handleRun = function () {
    axios.get('https://icanhazdadjoke.com/search?term=' + code, { headers: { 'Accept': 'application/json' } })
      .then(res => setOutput(res.data.results.map((r: DadJokesResult) => r.joke).join('\n\n')))
      .catch(err => setOutput(err));
  }
  return (
    <div className="TryOut">
      <h1 style={{ fontSize: '36pt' }}>try out juri</h1>
      <div>
        <Editor callback={setCode} />
        <TextField label='Output' multiline margin='normal' variant='outlined' style={{ width: '40%', minWidth: '400px', margin: '2%' }} rows='15' value={output} disabled />
      </div>
      <Button variant='contained' onClick={handleRun}>Run</Button>
    </div>

  );
}

declare interface editorProps {
  callback: Function,
  autoFocus?: boolean
}
function Editor({ callback, autoFocus }: editorProps) {
  
  let [highlighted, setHighlighted] = useState(<></>);
  let [text, setText] = useState('');
  let handleChange = function (event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value !== text) {
      setText(event.target.value);
      callback(event.target.value);
      setHighlighted(<>{highlight(event.target.value)}</>);
    }
  }

  let handleKeyPress = function (event: KeyboardEvent<HTMLDivElement>) {
    let t = event.target as HTMLTextAreaElement;
    let tab = '    ';
    let cpos = t.selectionStart;
    let insert = function (text: string) {
      t.value = t.value.slice(0, cpos) + text + t.value.slice(cpos);
    }
    let currentRow = () => {
      let rows = t.value.slice(0, cpos).split('\n');
      return rows[rows.length-1];
    }
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        insert(tab);
        t.setSelectionRange(cpos+4, cpos+4);
        break;
      case 'Enter':
        event.preventDefault();
        let matches = currentRow().match(/( {4})+/);
        let spaces = 0;
        if (matches) {
          spaces = matches[0].length;
        }
        if (currentRow().match(/^\s*(if|fun|operator)/)){
          spaces+=4;
        }
        insert('\n' + ' '.repeat(spaces));
        t.setSelectionRange(cpos+spaces+1, cpos+spaces+1);
        break;
      case 'Backspace':
        if(currentRow().match(/ {4}$/)){
          event.preventDefault();
          t.value = t.value.slice(0,cpos-4) + t.value.slice(cpos);
          t.setSelectionRange(cpos-4, cpos-4);
        }
        break;
    }
    //t.dispatchEvent(new Event('change'));
    handleChange({target: {name: t.name, value : t.value}} as ChangeEvent<HTMLTextAreaElement>);
  }
  let getBoundings = function(elementID : string){
    let rect = document.getElementById(elementID)?.getBoundingClientRect()!;

    return rect? {top: rect.top, left: rect.left} : {top: 0, left : 0};
  }
  return <>
    <TextField sx={{ color: 'transparent !important' }} id='editor' placeholder='Please enter your code here.' onKeyDown={handleKeyPress} inputProps={{ spellCheck: 'false' }} autoFocus={autoFocus} multiline onChange={handleChange} margin='normal' variant='outlined' style={{ width: '40%', minWidth: '400px', margin: '2%' }} rows='15' />
    <DivOverlay elementID={'editor'} boundings={getBoundings('editor')}>{highlighted}</DivOverlay>
  </>
}


function highlight(text: string) {
  const keywords = { regex: /^(fun|repeat|operator|init|as|iterate)$/, color: 'rgb(0,200,255' };
  const separators = { regex: /[()[\]]/, color: 'rgb(200,200,240)' };
  const numbers = { regex: /\d+/, color: 'rgb(230,255,200)' };
  const lists = { regex: /:[A-Za-z]\w*/, color: 'rgb(255,200,120)' };
  const operators = { regex: /[+\-*/><.=!%|&]/, color: 'rgb(100,255,255)' };
  const comments = {regex: /#.*/, color: 'rgb(150,150,150)'}
  const hl = new Highlighter(
    { regex: /if/, color: 'rgb(255,100,80)' },
    keywords,
    separators,
    numbers,
    lists,
    operators,
    comments
  );

  return hl.highlight(text);
}

function DivOverlay({ elementID, children, boundings}: { elementID: string, children: ReactNode, boundings: {top: number, left : number}}) {
  let [style, setStyle] = useState({
    width: '0',
    height: '0',
    maxWidth: '0',
    maxHeight: '0',
    pointerEvents: 'none',
    position: 'absolute',
    textAlign: 'left',
    lineHeight: '1.4375em',
    overflow: 'auto',
    // border: '2px solid red',
    color: 'white',
    top: 0,
    left: 0
  } as CSSProperties);

  let updateStyle = function () {
    let element = document.getElementById(elementID)!;
    let compStyle = getComputedStyle(element);
    let rect = element.getBoundingClientRect();
    setStyle({
      ...style,
      width: compStyle.width,
      maxWidth: compStyle.width,
      height: compStyle.height,
      maxHeight: compStyle.height,
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    } as CSSProperties);
  }
  window.onscroll = updateStyle;
  window.onresize = updateStyle
  window.onload = () =>{
    updateStyle();
    document.getElementById(elementID)!.onresize = updateStyle;
  }
  let styleZ = function(){
    let element = document.getElementById(elementID);
    let compStyle = element && getComputedStyle(element);
    return {
      ...style,
      ...(element && {
      width: compStyle!.width,
      maxWidth: compStyle!.width,
      height: compStyle!.height,
      maxHeight: compStyle!.height,
      top: boundings.top + window.scrollY,
      left: boundings.left + window.scrollX
      })
    } as CSSProperties
  }
  return <div style={styleZ()}>{children}</div>
}
