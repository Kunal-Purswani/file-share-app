import './App.css';
import { useRef, useState, useEffect } from 'react';
import { uploadFile } from './services/api';

function App() {

  const fileInputRef = useRef();

  const [file, setFile] = useState('');

  const [displayMsg, setDisplayMsg] = useState('');

  const [result, setResult] = useState('');

  const [showPrompt, setShowPrompt] = useState('none');

  useEffect(() => {
    const getImage = async ()=>{
      if(file){
        const data = new FormData();
        data.append("name",file.name);
        data.append("file",file);
        let response = await uploadFile(data);
        setResult(response.path)
      }
    }
    getImage();
  }, [file])
  

  const onUploadClick = ()=>{
    fileInputRef.current.click();
  }

  const downloadClicked = ()=>{
    window.open(result,"_blank","noopener","noreferrer")
  }

  const copyUrlClicked = async ()=>{
    try {
      await navigator.clipboard.writeText(result);
      setDisplayMsg('Link copied to clipboard!');
    } catch (err) {
      setDisplayMsg('Failed to copy: ', err);
    }
    setShowPrompt('block');
    setTimeout(()=>{
      setShowPrompt('none');
    },5000)
  }

  return (
    <div className="container">
      <div className='wrapper'>
        <h1>Simple File Sharing!</h1>
        <p>Upload and share the download link.</p>
        <button onClick={()=>onUploadClick()}>Upload</button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{display:'none'}}
          onChange={(e)=>setFile(e.target.files[0])}
        />
        {
          result!==''?
            (<div className='options'>
              <button onClick={downloadClicked}>Download</button>
              <button onClick={copyUrlClicked}>Copy URL</button>
            </div>) :
            <></>
        }
        <h5 style={{display: showPrompt,}}>{displayMsg}</h5>
      </div>
    </div>
  );
}

export default App;
