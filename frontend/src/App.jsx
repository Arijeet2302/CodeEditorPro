import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('py');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('python');
  const [filename, setFileName] = useState("");
  const [Files, SetFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState("");

  const showFiles = () =>{
    axios.post("https://code-editor-pro-backend.vercel.app/user/files",{
      username : "Arijeet Sinha"
    })
    .then((res)=>{
      // console.log(res.data);
      SetFiles(res.data);
    })
    .catch((e)=>{
      console.log("Error Showing files: ",e);
    })
  }

  const handleCompile = () => {

    axios.post('https://code-editor-pro-backend.vercel.app/compile', {
      code: code,
      language: language,
      input: input
    })
      .then((response) => {
        console.log(response.data);
        setOutput(response.data.Result);
        setError(response.data.Errors);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  useEffect(() => {
    switch (language) {
      case "c":
        setMode('java');
        break;
      case "cpp":
        setMode('java');
        break;
      case "py":
        setMode('python');
        break;
      case "java":
        setMode('java');
        break;
      case "cs":
        setMode('csharp');
        break;
      default:
        setMode('python');
        break;
    }
  }, [language])

  const handleFile = ()=>{
    axios.post("https://code-editor-pro-backend.vercel.app/user/add",{
      username : "Arijeet Sinha",
      FileName : filename + "." + language,
      Code : code,
      Language : language
    })
    .then((res)=>{
      alert(res.data.msg);
      showFiles();
    })
    .catch((e)=>{
      console.log("Error while adding file: ",e);
    })
  }

  const handleFiledDelete = (filename) =>{
    axios.delete("https://code-editor-pro-backend.vercel.app/user/delete",{
      data : {
        username : "Arijeet Sinha",
        FileName : filename
      }
    })
    .then((res)=>{
      alert(res.data.msg);
      showFiles();
    })
    .catch((e)=>{
      console.log(("Error While adding data: ",e));
    })
  }

  const handleCurrentFile =(current_code,file_name )=>{
    setCode(current_code);
    setCurrentFile(file_name);
  }

  const EditFile =()=>{
    axios.post("https://code-editor-pro-backend.vercel.app/user/updateFile",{
      username : "Arijeet Sinha",
      FileName : currentFile,
      Code : code,
      Language : language
    })
    .then((res)=>{
      alert(res.data.msg);
    })
    .catch((e)=>{
      console.log("Errror while updateing file:",e);
    })
  }

  return (
    <div className="App" >
      <h1>Code Compiler</h1>
      <div style={{ 'display': 'flex' }}>
        <div>
        <div id='headername'>
        <h2>{currentFile}</h2>
        { currentFile ? (<button onClick={EditFile}>Save Current File</button>):(<div></div>)}
        </div>
          <AceEditor
            mode={mode}
            theme='dracula'
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              fontSize: 20,
              showPrintMargin: false,
            }}
            value={code}
            onChange={(e) => setCode(e)}
          />
        </div>
        <div>
          <select onChange={(e) => setLanguage(e.target.value)} name='language'>
            <option value="py">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="cs">C#</option>
            <option value="java">Java</option>
            <option value="js">Javascript</option>
            <option value="go">Golang</option>
          </select>
          <button onClick={handleCompile}>Compile</button><br />
          <label htmlFor='code-input'>Input </label>
          <textarea
            id='code-input'
            type='text'
            placeholder='Enter input If required'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <div>
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
          <div>
            <h2>Error:</h2>
            <pre>{error}</pre>
          </div>
          <div>
            <input 
              id="filename"
              type='text'
              placeholder='Enter File Name'
              value={filename}
              onChange={(event)=>setFileName(event.target.value)}
            />
            <button onClick={handleFile}>Save</button>
          </div>
          <div>
            <div id="click-obj" onClick={showFiles}>Show Files</div>
            {Files.map((item)=>(
              <div key={item._id}>
                <div id='click-obj' onClick={()=>handleCurrentFile(item.Code,item.FileName)}>{item.FileName}
                  <button onClick={()=>handleFiledDelete(item.FileName)}>delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
