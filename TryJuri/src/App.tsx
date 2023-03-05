import React, {ChangeEvent, useState } from 'react';
import './style/App.scss';
import {Input, Button, FormControl, TextField, Paper} from '@mui/material';
import {styled} from '@mui/material/styles';
import axios from 'axios';

const Output = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#FFF",
    color: "#FFF"
  }
}));

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput]  = useState('');

  let handleRun = function(){
    axios.get('https://icanhazdadjoke.com/search?term='+code, { headers: {'Accept': 'application/json'}})
    .then(res => setOutput(res.data.results.map((r : DadJokesResult) => r.joke).join('\n\n')))
    .catch(err => setOutput(err));
  }
  let handleChange = function(event :ChangeEvent<HTMLTextAreaElement>){
    setCode(event.target.value);
  }
  return (
    <div className="App">
      <h1>try out juri</h1>
      <div>
      <TextField placeholder='Please enter your code here.' autoFocus multiline onChange={handleChange}  margin='normal' variant='outlined' InputProps={{style:{backgroundColor: 'rgb(85,85,80)', color:'white'}}} style={{width:'40%', minWidth:'400px', margin:'2%'}} rows='15'/>
      <TextField 
        sx={{ 
          '& .MuiOutlinedInput-input.Mui-disabled' : {color: "white", WebkitTextFillColor:'white'},
          '& .MuiInputLabel-root.Mui-disabled' : {color: 'white'}
          
        }} label='Output' multiline margin='normal' variant='outlined' InputProps={{style:{backgroundColor: 'rgb(85,85,80)', color:'white'}}} style={{width:'40%', minWidth:'400px', margin:'2%'}} rows='15' value={output} disabled/>
      </div>
      <Button variant='contained' onClick={handleRun}>Run</Button>
    </div>
  );
}

export default App;