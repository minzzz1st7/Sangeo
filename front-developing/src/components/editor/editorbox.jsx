import React, {useState, useRef} from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
// 글자 색 지정 기능
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// 기본 언어 한국어로 설정
import '@toast-ui/editor/dist/i18n/ko-kr';
import EditorViewer from './editorviewer';

function EditorBox (){

    const editorRef = useRef();

    const showContent = () => {
       
       // console.log(contentHTML);
    }

    async function handleEditor(e) {
        const editorBody = editorRef.current.getInstance().getHTML();

        const data = await fetch("/test", {
            method: "POST",
            headers : { "Content-Type" : "application/json"},
            body: JSON.stringify({editorBody})
        });
    }

    return (

        <div className='edit_wrap'>
            <Editor
                initialValue= ''
                previewStyle= 'vertical'
                height = '400px'
                initialEditType='wysiwyg'
                useCommandShortcut = {false}
                hideModeSwitch = {true}
                plugins = {[colorSyntax]}
                language = "ko-KR"
                ref={editorRef}
            />


            <button onClick={handleEditor}> 작성하기 </button>

        </div>
    );
}

export default EditorBox;