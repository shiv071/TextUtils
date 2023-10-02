import React, { useState } from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("")

    const handleClickUpper = () => {
        console.log("Upper");
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to UpperCase","success");
    }

    const handleClickLower = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to LowerCase","success");
    }

    const handleClickClear = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text has been cleared","success");
    }

    const handleClickSent = () => {
        let newText = text.split('. ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ');
        setText(newText);
        props.showAlert("Converted to SentenceCase","success");
    }

    const handleDownload = () => {
        const blob = new Blob([text], { type: 'text/plain' });

        // Create a temporary link element
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'downloaded-file.txt';

        // Programmatically click the link to trigger the download
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(a.href);
        props.showAlert("Text has been downloaded","success");
    }

    const handleRemoveBlank = ()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Blankspace removed","success");
    }

    const handleCopy =()=>{
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text has been copied","success");
    }

    const handleOnChange = (event) => {
        console.log("Change");
        setText(event.target.value);
    }

    const count = ()=>{
        if (text.length>0){
            return text.trim().split(/[ ]+/).length;
        }
        else{
            return 0;
        }
    }


    return (
        <>
            <div className='container' style={{color:props.mode==='dark'?'white':'black'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} style={{color:props.mode==='dark'?'white':'black',backgroundColor:props.mode==='dark'?'gray':'white'}} onChange={handleOnChange} placeholder="Leave a comment here" id="myBox" rows={8}></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleClickUpper}>UpperCase</button>
                <button className="btn btn-primary mx-2" onClick={handleClickLower}>LowerCase</button>
                <button className="btn btn-primary mx-2" onClick={handleClickClear}>Clear Text</button>
                <button className="btn btn-primary mx-2" onClick={handleClickSent}>SentenceCase</button>
                <button className="btn btn-primary mx-2" onClick={handleDownload}>Download Text</button>
                <button className="btn btn-primary mx-2" onClick={handleRemoveBlank}>Remove Blank</button>
                <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>
            </div>

            <div className="container my-3" style={{color:props.mode==='dark'?'white':'black'}}>
                <h2>Your Text Summary</h2>
                <p>{count()} words and {text.length} characters</p>
                <p>{0.008 * count()}min reading time</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in textArea to preview your text."}</p>
            </div>
        </>
    )
}
