import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools"
import { DocumentPlusIcon, FolderOpenIcon, TrashIcon, FolderIcon, PlayIcon } from '@heroicons/react/24/outline'
import LogoPython from '../components/LogoPython'
import LogoJavaScript from '../components/LogoJavaScript'
import LogoJava from '../components/LogoJava'
import LogoC from '../components/LogoC'
import LogoCPlusPlus from '../components/LogoCPlusPlus'
import LogoCSharp from '../components/LogoCSharp'


function Compiler() {

  const username = useSelector((state) => state.auth.username);
  const userData = useSelector((state) => state.auth.userData);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (username != undefined) {
      setUserName(username)
    } else {
      setUserName(userData.userData.name);
      // console.log(userData.userData.name);
    }
  }, [username, setUserName, userData])

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('py');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('python')
  const [filename, setFileName] = useState("");
  const [Files, SetFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState("Untitled");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCompile = () => {
    console.log(code,language,input);

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

  const showFiles = () => {
    axios.post("https://code-editor-pro-backend.vercel.app/user/files", {
      username: userName
    })
      .then((res) => {
        // console.log(res.data);
        SetFiles(res.data);
      })
      .catch((e) => {
        console.log("Error Showing files: ", e);
      })
  }

  useEffect(() => {
    switch (language) {
      case "c":
        setMode('java');
        break;
      case "cpp":
        setMode('java');
        break;
      case "py":
        // setCode('print("Hello World!!")');
        setMode('python');
        break;
      case "java":
        // setCode('//Main Class Name Should be Progman');
        setMode('java');
        break;
      case "cs":
        setMode('csharp');
        break;
      case "js":
        // setCode('console.log("Hello World!");');
        setMode('javascript');
        break;
      default:
        // setCode('print("Hello World!!")');
        setMode('python');
        break;
    }
  }, [language])


  //File system functions

  const EditFile = () => {
    axios.post("https://code-editor-pro-backend.vercel.app/user/updateFile", {
      username: userName,
      FileName: currentFile,
      Code: code,
      Language: language
    })
      .then((res) => {
        alert(res.data.msg);
        showFiles();
      })
      .catch((e) => {
        console.log("Errror while updateing file:", e);
      })
  }

  const handleFile = () => {
    if (currentFile === "Untitled") {
      axios.post("https://code-editor-pro-backend.vercel.app/user/add", {
        username: userName,
        FileName: filename + "." + language,
        Code: code,
        Language: language
      })
        .then((res) => {
          alert(res.data.msg);
          showFiles();
        })
        .catch((e) => {
          console.log("Error while adding file: ", e);
        })
    } else {
      EditFile();
    }
  }

  const handleFiledDelete = (filename) => {
    axios.delete("https://code-editor-pro-backend.vercel.app/user/delete", {
      data: {
        username: userName,
        FileName: filename
      }
    })
      .then((res) => {
        alert(res.data.msg);
        showFiles();
      })
      .catch((e) => {
        console.log(("Error While adding data: ", e));
      })
  }

  // setting selected filename and show corresponding code
  const handleCurrentFile = (current_code, file_name) => {
    setCode(current_code);
    setCurrentFile(file_name);
  }

  //create untitled newFile 
  const handleNewFile = () => {
    setCode("");
    setCurrentFile("Untitled");
  }

  return (

    <section>
      {/* main body starts here */}
      {/* starts - vertical division of the body - 20%: sidebar, 50%: codebox, 30%: resultbox */}
      <div className='flex flex-row max-h-[500px]'>
        {/* start - sidebar */}
        <div className='basis-[15%] overflow-y-scroll bg-slate-800 border-r-[1px] border-t-[1px] border-gray-500 relative flex flex-col justify-between'>
          {/* start - control_sidebar */}
          <div className='flex flex-col'>
            {/* start - save_function */}
            <div className='flex flex-col m-2'>
              {/* start - filename_input */}
              <input type="text" id="filename" className="p-2 w-full text-sm text-gray-900 bg-gray-50 border-t-2 border-l-2 border-r-2 border-grey-50" placeholder="Filename" value={filename}
                onChange={(event) => setFileName(event.target.value)} />
              {/* end - filename_input */}
              {/* start - save_button */}
              <button className='p-2 border-2 border-grey-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500' onClick={handleFile}>
                <div className='flex flex-row text-gray-50'>
                  <DocumentPlusIcon className="h-6 w-6 mr-2" />
                  <p className='pl-2 border-l-[1px] border-l-gray-50'>Save File</p>
                </div>
              </button>
              {/* end - save_function */}
              {/* start - newFile_button */}
              <button className='p-2 border-2 border-grey-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500' onClick={handleNewFile}>
                <div className='flex flex-row text-gray-50'>
                  <DocumentPlusIcon className="h-6 w-6 mr-2" />
                  <p className='pl-2 border-l-[1px] border-l-gray-50'>New File</p>
                </div>
              </button>
              {/* end - newFile_button */}
            </div>
            {/* start - open_drpdown_button */}
            <button className={`mx-2 mt-0 p-2 border-2 border-grey-50 ${isDropdownOpen ? 'border-b-0' : 'hover:border-blue-300 hover:bg-blue-500 hover:border-2'}`} onClick={toggleDropdown}>
              <div className='flex flex-row text-gray-50'>
                {isDropdownOpen ? <FolderOpenIcon className="h-6 w-6 mr-2" /> : <FolderIcon className="h-6 w-6 mr-2" />}
                <p className={`pl-2 border-l-[1px] border-l-gray-50`} onClick={showFiles}>Open File</p>
              </div>
            </button>
            {isDropdownOpen ? Files.map((item) => (
              <div key={item._id} className='mx-2 mb-2 p-2 border-2 border-grey-50'>
                <div id='click-obj' className='flex items-center justify-between'>
                  {/* {console.log({ item, currentFile })} */}
                  <p
                    className='cursor-pointer text-white'
                    onClick={() => handleCurrentFile(item.Code, item.FileName)}
                  >{item.FileName}</p>

                  <button
                    className={`hover:text-red-600 rounded text-white text-center`}
                    onClick={() => handleFiledDelete(item.FileName)}
                  >
                    <TrashIcon className='h-6 w-6 block' />
                  </button>
                </div>
              </div>
            )) : null}
            {/* end - open_drpdown_button */}
          </div>
          {/* end - control_sidebar */}
          {/* start - select_languages_sidebar */}
          <div className='flex flex-col relative bottom-0'>
            {/* start - LogoPython */}
            <button className={`m-2 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'py' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('py')} >
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoPython />
                </div>
                <p className='pl-2 border-l-[1px] border-l-gray-50'>Python</p>
              </div>
            </button>
            {/* end - LogoPython */}
            {/* start - LogoJavaScript */}
            <button className={`m-2 mt-0 p-2 pt-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'js' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('js')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoJavaScript />
                </div>
                <p className='pl-2 border-l-[1px] border-l-gray-50'>JavaScript</p>
              </div>
            </button>
            {/* end - LogoJavaScript */}
            {/* start - LogoJava*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'java' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('java')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoJava />
                </div>
                <p className='pl-2 border-l-[1px] border-l-gray-50'>Java</p>
              </div>
            </button>
            {/* end - LogoJava */}
            {/* start - LogoC*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'c' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('c')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoC />
                </div>
                <p className='pl-2 border-l-[1px] border-l-gray-50'>C</p>
              </div>
            </button>
            {/* end - LogoC */}
            {/* start - LogoCPlusPlus*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'cpp' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('cpp')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoCPlusPlus />
                </div>
                <p className='pl-2 border-l-[1px] border-l-gray-50'>C++</p>
              </div>
            </button>
            {/* end - LogoCPlusPlus */}
            {/* start - LogoCSharp*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'cs' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('cs')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoCSharp />
                </div>
                <p className='pl-2 border-l-[1px] border-l-gray-50'>C#</p>
              </div>
            </button>
            {/* end - LogoCSharp */}
          </div>
          {/* start - select_languages_sidebar */}
        </div>
        {/* end - sidebar */}
        {/* start - codebox */}
        <div className='basis-[55%]'>
          <div className="bg-gray-100 w-40">
            <div className="flex items-center justify-between bg-blue-500 w-30 h-8 text-white p-2 ">
              {currentFile === "Untitled" ? (
                <span className='flex items-center justify-between'>{currentFile}.{language}</span>
              ) : (
                <span className='flex items-center justify-between'>{currentFile}</span>
              )}
              <button className="px-2 py-1 text-500 rounded-full">x</button>
            </div>
          </div>
          <AceEditor
            mode={mode}
            theme='dracula'
            height='468px'
            width='full'
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
        {/* end - codebox */}
        {/* start - resultbox */}
        <div className='w-full max-h-[500px] flex flex-col basis-[30%]'>
          {/* start - run_button */}
          <div className='basis-[10%]'>
            <button className='w-full h-full p-2 border-2  hover:border-2 bg-green-500 border-green-100 hover:border-green-300 hover:bg-green-600' onClick={handleCompile}>
              <div className='flex justify-center text-gray-50'>
                <PlayIcon className="h-6 w-6 mr-2" />
                <p className='pl-2 border-l-gray-50'>Run</p>
              </div>
            </button>
          </div>
          {/* end - run_button */}
          {/* start - inputbox */}
          <div className='basis-[20%] p-2 border-2 border-t-0 border-gray-50 bg-slate-800' >
            <label htmlFor="inputbox" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Input Box</label>
            <textarea id="inputbox" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300" placeholder="Enter input if required"
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          {/* end - inputbox */}
          {/* start - outputbox */}
          <div className='basis-[40%] p-2 border-2 border-t-0 border-gray-50 bg-slate-800'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Output Box</label>
            <pre className="block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300" placeholder="Your output . . .">
              {output}
            </pre>
          </div>
          {/* end - outputbox */}
          {/* start - errorbox */}
          {error ? (
            <div className='basis-[30%] p-2 border-2 border-t-0 border-gray-50 bg-slate-800 overflow-auto'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Error Box</label>
              <pre className="block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300" placeholder="Your error . . .">
                {error}
              </pre>
            </div>
          ) : (<div></div>)}
          {/* end - errorbox */}
        </div>
        {/* end - resultbox */}
      </div>
      {/* ends - vertical division of the body - 20%: sidebar, 50%: codebox, 30%: resultbox */}
      {/* main body ends here */}
    </section>
  )
}

export default Compiler;