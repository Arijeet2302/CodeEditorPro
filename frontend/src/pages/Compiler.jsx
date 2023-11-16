import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools"
import { DocumentPlusIcon, TrashIcon, FolderIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/outline'
import { FolderIcon as SolidFolderIcon } from '@heroicons/react/24/solid'
import LogoPython from '../components/LogoPython'
import LogoJavaScript from '../components/LogoJavaScript'
import LogoJava from '../components/LogoJava'
import LogoC from '../components/LogoC'
import LogoCPlusPlus from '../components/LogoCPlusPlus'
import LogoCSharp from '../components/LogoCSharp'
import LogoGoLang from '../components/LogoGoLang'


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

  const [code, setCode] = useState('print("Hello World!!")');
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
        setCode("");
        setMode('c_cpp');
        break;
      case "cpp":
        setCode("");
        setMode('c_cpp');
        break;
      case "py":
        setCode('print("Hello World!!")');
        setMode('python');
        break;
      case "java":
        setCode('//Main Class Name Should be Progman');
        setMode('java');
        break;
      case "cs":
        setCode("");
        setMode('csharp');
        break;
      case "js":
        setCode('console.log("Hello World!");');
        setMode('javascript');
        break;
      case "go":
        setCode('');
        setMode('golang');
        break;
      default:
        setCode('print("Hello World!!")');
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
  const handleCurrentFile = (current_code, file_name, selected_language) => {
    setLanguage(selected_language);
    setCode(current_code);
    setCurrentFile(file_name);
  }

  //create untitled newFile 
  const handleNewFile = () => {
    setCode("");
    setCurrentFile("Untitled");
  }

  const [browserHeight, setBrowserHeight] = useState(window.innerHeight);
  const navbarHeight = '63px';
  const filenameHeight = '32px';

  useEffect(() => {
    // Update the browserHeight when the window is resized
    const handleResize = () => {
      setBrowserHeight(window.innerHeight);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const mainBodyHeight = browserHeight - parseInt(navbarHeight, 10);
  const aceEditorHeight = browserHeight - parseInt(navbarHeight, 10) - parseInt(filenameHeight, 10);
  //console.log(mainBodyHeight);
  // const mainBodyHeightpx = `${mainBodyHeight}px`;
  // const aceEditorHeightpx = `${aceEditorHeight}px`;
  //console.log(mainBodyHeightpx);

  return (

    <section>
      {/* main body starts here */}
      {/* starts - vertical division of the body - 20%: sidebar, 50%: codebox, 30%: resultbox */}
      <div style={{ height: mainBodyHeight }} className='flex flex-row bg-slate-800'>
        {/* start - sidebar */}
        <div className='basis-[15%] overflow-y-scroll bg-slate-800 border-r-[1px] border-gray-500 relative flex flex-col justify-between'>
          {/* start - control_sidebar */}
          <div className='flex flex-col'>
            {/* start - newFile_button */}
            <button className='m-2 mb-0 p-2 border-2 border-grey-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500' onClick={handleNewFile}>
              <div className='flex flex-row text-gray-50'>
                <PlusIcon className="h-6 w-6 mr-2" />
                <p className='pl-2 border-l-[1px] border-l-gray-50'>New File</p>
              </div>
            </button>
            {/* end - newFile_button */}
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
            </div>
            {/* start - open_drpdown_button */}
            <button className={`mx-2 mt-0 p-2 border-2 border-grey-50 ${isDropdownOpen ? 'border-b-2' : 'hover:border-blue-300 hover:bg-blue-500 hover:border-2'}`} onClick={toggleDropdown}>
              <div className='flex flex-row text-gray-50'>
                {isDropdownOpen ? <SolidFolderIcon className="h-6 w-6 mr-2" /> : <FolderIcon className="h-6 w-6 mr-2" />}
                <p className={`pl-2 border-l-[1px] border-l-gray-50`} onClick={showFiles}>Open File</p>
              </div>
            </button>
            {isDropdownOpen ? Files.map((item) => (
              <div key={item._id} className='mx-2 p-2 border-x-2 border-b-2 border-t-0 border-grey-50 bg-slate-700'>
                <div id='click-obj' className='flex items-center justify-between'>
                  {/* {console.log({ item, currentFile })} */}
                  <p
                    className='truncate cursor-pointer text-white hover:text-green-500'
                    onClick={() => handleCurrentFile(item.Code, item.FileName, item.Language)}
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
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>Python</p>
              </div>
            </button>
            {/* end - LogoPython */}
            {/* start - LogoJavaScript */}
            <button className={`m-2 mt-0 p-2 pt-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'js' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('js')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoJavaScript />
                </div>
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>JavaScript</p>
              </div>
            </button>
            {/* end - LogoJavaScript */}
            {/* start - LogoJava*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'java' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('java')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoJava />
                </div>
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>Java</p>
              </div>
            </button>
            {/* end - LogoJava */}
            {/* start - LogoC*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'c' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('c')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoC />
                </div>
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>C</p>
              </div>
            </button>
            {/* end - LogoC */}
            {/* start - LogoCPlusPlus*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'cpp' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('cpp')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoCPlusPlus />
                </div>
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>C++</p>
              </div>
            </button>
            {/* end - LogoCPlusPlus */}
            {/* start - LogoCSharp*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'cs' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('cs')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoCSharp />
                </div>
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>C#</p>
              </div>
            </button>
            {/* end - LogoCSharp */}
            {/* start - LogoGoLang*/}
            <button className={`m-2 mt-0 p-2 border-2 border-gray-50  hover:border-2 hover:border-blue-300 hover:bg-blue-500 ${language == 'go' ? 'bg-blue-500 border-blue-300' : ''}`} onClick={() => setLanguage('go')}>
              <div className='flex flex-row text-gray-50'>
                <div className='pr-2'>
                  <LogoGoLang />
                </div>
                <p className='truncate pl-2 border-l-[1px] border-l-gray-50'>Go</p>
              </div>
            </button>
            {/* end - LogoGoLang */}
          </div>
          {/* start - select_languages_sidebar */}
        </div>
        {/* end - sidebar */}
        {/* start - codearea */}
        <div className='basis-[55%]'>
          {/* start current filename */}
          <div className="w-full h-[32px]">
            <div className="flex items-center bg-slate-800 w-30 h-8 text-white p-2 border-slate-800">
              <p className='text-sm font-medium text-gray-500'>Current Filename: </p>
              {currentFile === "Untitled" ? (
                <span className='flex items-center justify-between px-2 text-sm font-medium text-green-500'>{currentFile}.{language}</span>
              ) : (
                <span className='flex items-center justify-between px-2 text-sm font-medium text-green-500'>{currentFile}</span>
              )}
              {/* <button className="px-2 py-1 text-500 rounded-full">
                <SolidXCircleIcon className="h-6 w-6 mr-2" />
              </button> */}
            </div>
          </div>
          {/* end current filename */}
          {/* start codebox */}
          <div className="w-full ">
            {/* {console.log(`The value is: ${mainBodyHeightpx}`)};
          {console.log(`The type is: ${typeof (mainBodyHeightpx)}`)}; */}
            <AceEditor
              mode={mode}
              theme='dracula'
              //height='565px'
              height={aceEditorHeight}
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
            {/* start codebox */}
          </div>
        </div>
        {/* end - codearea */}
        {/* start - resultbox */}
        <div className='w-full flex flex-col basis-[30%]'>
          {/* start - run_button */}
          <div className='h-[40]px'>
            <button className='w-full h-full p-2 border-2  hover:border-2 bg-green-500 border-green-100 hover:border-green-300 hover:bg-green-600' onClick={handleCompile}>
              <div className='flex justify-center text-gray-50'>
                {/* {console.log(handleCompile)}
                {handleCompile ? <SolidPlayIcon className="h-6 w-6 mr-2" /> : <PlayIcon className="h-6 w-6 mr-2" />} */}
                <PlayIcon className="h-6 w-6 mr-2" />
                <p className='pl-2 border-l-gray-50'>Run</p>
              </div>
            </button>
          </div>
          {/* end - run_button */}
          {/* start - mainresultbox */}
          <div style={{ height: mainBodyHeight - 40 }} className='flex flex-col justify-stretch'>
            {/* start - inputbox */}
            <div className='basis-[40%] p-2 border-2 border-t-0 border-gray-50 bg-slate-800' >
              <label htmlFor="inputbox" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Input Box</label>
              <textarea id="inputbox" className="block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300" placeholder="Enter input if required"
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {/* end - inputbox */}
            {/* start - outputbox */}
            <div className='basis-[60%]  p-2 border-2 border-y-0 border-gray-50 bg-slate-800'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Output Box</label>
              <p className="break-words block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300" placeholder="Your output . . .">
                {output}
              </p>
            </div>
            {/* end - outputbox */}
            {/* start - errorbox */}
            {error ? (
              <div className='p-2 border-2 border-b-0 border-gray-50 bg-slate-800 overflow-auto'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Error Box</label>
                <p className="break-words block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300" placeholder="Your error . . .">
                  {error}
                </p>
              </div>
            ) : null}
            {/* end - errorbox */}
          </div>
          {/* end - mainresultbox */}
        </div>
        {/* end - resultbox */}
      </div>
      {/* ends - vertical division of the body - 20%: sidebar, 50%: codebox, 30%: resultbox */}
      {/* main body ends here */}
    </section>
  )
}

export default Compiler;