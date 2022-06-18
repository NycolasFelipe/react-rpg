import { useState } from 'react';
import React from 'react';
import TitleCase from '../Functions/TitleCase';
import './CardGeneralInfo.css';

export default function CardGeneralInfo(props) {
  //#region Get Data from Parent
  const playerName = props.playerName;
  const characterName = props.characterName;
  const characterRace = props.characterRace;
  const characterClass = props.characterClass;
  const cardImageLink = props.cardImageLink;
  const imageSizePercent = props.imageSizePercent;
  const imagePosX = props.imagePosX;
  const imagePosY = props.imagePosY;
  //#endregion End Get Data from Parent

  //#region Display Name
  const handleName = (value, type) => {
    //Passing value to parent component
    props.getName(value, type);
    
    switch(type) {
      case "player": {
        if (checkInputSize(value)) 
          setSizeInputPlayer(sizeInputSmall);
        else
          setSizeInputPlayer(sizeInputDefault);
      } break;

      case "character": {
        if (checkInputSize(value)) 
          setSizeInputCharacter(sizeInputSmall);
        else
          setSizeInputCharacter(sizeInputDefault);
      } break;
      
      case "characterRace": {
        if (checkInputSize(value)) 
          setSizeInputCharacterRace(sizeInputSmall);
        else
          setSizeInputCharacterRace(sizeInputDefault);
      } break;
      
      case "characterClass": {
        if (checkInputSize(value)) 
          setSizeInputCharacterClass(sizeInputSmall);
        else
          setSizeInputCharacterClass(sizeInputDefault);
      } break;
    }
  }

  const checkInputSize = (value) => {
    let checkLength = value.length > 13;
    return checkLength;
  }

  const sizeInputDefault = "1rem";
  const sizeInputSmall = "0.8rem";

  const [sizeInputPlayer, setSizeInputPlayer] = useState(sizeInputDefault);
  const [sizeInputCharacter, setSizeInputCharacter] = useState(sizeInputDefault);
  const [sizeInputCharacterRace, setSizeInputCharacterRace] = useState(sizeInputDefault);
  const [sizeInputCharacterClass, setSizeInputCharacterClass] = useState(sizeInputDefault);

  const styleInputPlayer = {fontSize : sizeInputPlayer};
  const styleInputCharacter = {fontSize : sizeInputCharacter};
  const styleInputCharacterRace = {fontSize : sizeInputCharacterRace};
  const styleInputCharacterClass = {fontSize : sizeInputCharacterClass};
  //#endregion End Display Name

  //#region Change Color
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  const getRandomColor = () => {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[Math.floor(Math.random()*hex.length)];
    }
    return hexColor;
  }
  let [textColor, setTextColor] = useState("#");

  const changeColor = () => {
    const randomColor = getRandomColor();
    setTextColor(randomColor);
    props.changeColor(randomColor);
  }

  const checkColorInput = (e) => {
    const re = /[^A-Za-z0-9-#]+/g;
    setTextColor(e.target.value.replace(re, ''));

    if (e.target.value.length === 7) 
      props.changeColor(e.target.value);
    else if (e.target.value.length === 0) 
      setTextColor("#");
  }
  //#endregion End Change Color

  //#region Change Image Style
  const imageStyle = {
    backgroundImage : `url(${cardImageLink})`,
    backgroundSize : `${imageSizePercent}%`,
    backgroundPositionX : `${imagePosX}%`,
    backgroundPositionY : `${imagePosY}%`,
  }
  const imageStyleDefault = {
    backgroundImage : 'url("/images/default.jpg")',
    backgroundSize : 'cover',
    backgroundPosition : 'center',
  }

  const imageStyleSize = () => {
    if (imageSizePercent < 200) 
      props.changeSizePercent(imageSizePercent+25);
    else 
      props.changeSizePercent(110);
  }
  const imageStylePosition = (direction) => {
    const gap = 10;
    switch(direction) {
      case "top": props.changePosY(imagePosY-gap); break;
      case "bottom": props.changePosY(imagePosY+gap); break;
      case "left": props.changePosX(imagePosX-gap); break;
      case "right": props.changePosX(imagePosX+gap); break;
    }
  }

  const resizeArrowButton = (direction) => {
    if (direction === "center") {
      return (
        <button
          onClick={() => {imageStyleSize(); props.setUnsavedItems(true)}}
          className="resize-button--center">
        </button>
      )
    }
    else {
      return (
        <div
          onClick={() => {imageStylePosition(direction); props.setUnsavedItems(true)}}
          className={"resize-button "+`resize-button--${direction}`}>
        </div>
      )
    }
  }
  //#endregion Change Image Style

  //#region Edit Color
  const [editColorActive, setEditColorActive] = useState(false);
  const colorPickerWindowClass = (
    editColorActive 
    ? "color-picker-window color-picker-window--show" 
    : "color-picker-window"
  )
  const contentEditColor = () => (
    <>
      <button
        onClick={() => setEditColorActive(!editColorActive)}
        className='color-picker-button button'
        >Color
      </button>

      <div className={colorPickerWindowClass}>
        <p>Set Color</p>
        <input 
          className='input'
          onChange={(e) => checkColorInput(e)} 
          value={textColor} 
          type="text" 
          maxLength="7"
        />
        <button
        className='color-picker--random button'
          onClick={() => {changeColor(); props.setUnsavedItems(true)}}
          >Random
        </button>
        <button 
          className='color-picker--ok button'
          onClick={() => setEditColorActive(!editColorActive)}
          >OK
        </button>
      </div>
    </>
  )
  //#endregion Content Edit Color

  //#region Content Image
  //Edit Image Button Flag
  const [editImageBtn, setEditImageBtn] = useState(false);

  const contentImage = () => {
    if (editImageBtn) {
      return (
        <textarea 
          onChange={(e) => props.changeImageLink(e.target.value)}
          placeholder='paste your image link here' cols="30" rows="10"
          value={cardImageLink}>
        </textarea>
      )
    }
    else {
      return (
        <div 
          className='character-image'
          style={cardImageLink ? imageStyle : imageStyleDefault}>
        </div>
      )
    }
  }
  //#endregion Content Image

  //#region [CSS Class] Edit Image Button
  const editImageButtonClass = (
    `button ${editImageBtn 
    ? "edit-image-button edit-image-button--active" 
    : "edit-image-button"}`
  );
  //#endregion [CSS Class] Edit Image Button

  //#region Content Info Input
  const contentInfoInput = (label, name) => {
    let style = "";
    let value = "";
    switch (name) {
      case "player": 
        style = styleInputPlayer; 
        value = playerName;
      break;
      case "character":
        style = styleInputCharacter;
        value = characterName;
      break;
      case "characterRace": 
        style = styleInputCharacterRace; 
        value = characterRace;
      break;
      case "characterClass": 
        style = styleInputCharacterClass;
        value = characterClass;
      break;
    }
    return (
      <div className='content-info-item'>
        <span className='content-info-item--title'>{TitleCase(label)}</span>
        <input
          className='content-info-item--input input'
          onChange={(e) => handleName(e.target.value, name)}
          maxLength="20"
          type="text"
          name={name}
          style={style}
          value={value}
          />
      </div>
    )
  }
  //#endregion Content Info Input

  return (
    <div className={`card-content ${props.showContent}`}>
      <div className="content-info-buttons">
        <button 
          className={editImageButtonClass}
          onClick={() => setEditImageBtn(!editImageBtn)}>
          {editImageBtn ? "✓" : "✎"}
        </button>

        <div className="resize-image">
          <div>
            {resizeArrowButton("top")}
          </div>
          <div>
            {resizeArrowButton("left")}
            {resizeArrowButton("center")}
            {resizeArrowButton("right")}
          </div>
          <div>
            {resizeArrowButton("bottom")}
          </div>
        </div>

        <div className="edit-color">
          {contentEditColor()}
        </div>
      </div>

      <div className="content-image">
        {contentImage()}
      </div>
      <div className='content-info'>
        {contentInfoInput("Player's name:", "player")}
        {contentInfoInput("Character's name:", "character")}
        {contentInfoInput("Race:", "characterRace")}
        {contentInfoInput("Class:", "characterClass")}
      </div>
    </div>
  );
}