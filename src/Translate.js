import React, { useState, useEffect } from "react";
import { MdGTranslate } from "react-icons/md";
import { RiTranslate } from "react-icons/ri";
import image from './digital-translator-abstract-concept-illustration_335657-3769.avif'
import { Form, TextArea, Button } from "semantic-ui-react";
import axios from "axios";

export default function Translate() {
  const [textInput, setTextInput] = useState("");
  const [resultText, setResultText] = useState("");
  const [textLanguageKey, setTextLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  setTimeout(function(){
    var spin = document.getElementById('spin').style.display = "none"
    var cont = document.getElementById('cont').style.display = "block"

  }, 6000)
  // get the language of text input
  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: textInput,
      })
      .then((response) => {
        setdetectedLanguageKey(response.data[0].language);
        console.log(response.data[0].language)
      });
  };

  // translate the input text and set it in result field
  const translateText = () => {
    setResultText(textInput);

    getLanguageSource();

    let data = {
      q: textInput,
      source: detectLanguageKey,
      target: textLanguageKey,
    };
    axios.post(`https://libretranslate.de/translate`, data).then((response) => {
      setResultText(response.data.translatedText);
      console.log(response.data.translatedText)
    });
  };

  const languageKey = (selectedLanguage) => {
    setTextLanguageKey(selectedLanguage.target.value);
    console.log(selectedLanguage.target.value)
  };

  useEffect(() => {
    axios.get(`https://libretranslate.de/languages`).then((response) => {
      setLanguagesList(response.data);
      console.log("lang", response.data)
    });

    getLanguageSource();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput]);
  return (
     <>
<div className="h-screen loader " id="spin">
</div>
<div className="">
    <div className="hidden " id="cont" style={{display:"none"}}>
      <div className="md:flex md:h-screen md:mt-[450px] md:justify-between mt-[600px] grid grid-cols-1 h-screen md:flex-row md:items-center md:mx-44 mx-6">
        <div className="md:order-2">
        <img src={image} alt="Image here" className="w-[400px] md:w-auto"/>
        </div>
      <div className="md:order-1 md:w-1/2">
      <div className="title text-left leading-[24px]">
        <h1 className="md:text-6xl text-[30px]">
          {" "}
          <span>
          <RiTranslate style={{ margin: "0 10px" }} /></span>
          Welcome to your Friendly <span className="text-purple-700">TranslateLingo:</span> Seamlessly Connect the World.
        </h1>
        <p className="font-medium text-xl">Unlock a World of Possibilities with Effortless Language Translation – Connect, Communicate, and Cultivate Global Relationships Like Never Before!</p>
        <a href="#formm">
        <button className="bg-purple-700 text-white px-12 py-4 rounded-md hover:trasition hover:bg-purple-500 hover:duration-200">Start here</button></a>
      </div>

      
      </div>
      </div>

      {/* form */}
      <div className="translator-content md:w-[30%] w-[80%] mx-auto mb-40 mt-40 md:mt-0" id="formm">
        <Form >
          <div className="select-lang mb-6 border-solid border-purple-700 border rounded-md">
            <select className="select rounded-xl border border-solid border-purple-700" onChange={languageKey}>
              {languagesList.map((language) => {
                return <option value={language.code}>{language.name}</option>;
              })}
            </select>
          </div>
          <div className="wrapper flex gap-3 flex-col">
            <Form.Field
              control={TextArea}
              placeholder="Type text to translate"
              className="border-purple-700 border-solid rounded-md border"
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Form.Field
              control={TextArea}
              placeholder="Your result translation"
              value={resultText}
              className="border-purple-700 border-solid rounded-md border"
            />
          </div>
          <div className="btn mt-6 ">
            <button className="bg-purple-700 text-white px-8 py-4 hover:bg-purple-600 flex gap-1 justify-center items-center rounded-lg" onClick={translateText}>
              Translate
              <MdGTranslate style={{ margin: "0 10px" }} />
            </button>
          </div>
        </Form>
      </div>
      </div>
    </div>
    </> 
  );
}