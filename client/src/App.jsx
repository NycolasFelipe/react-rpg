import { useState, useEffect } from 'react';
import React from 'react';
import Axios from 'axios';
import './App.css';
import Card from './components/Card/Card';
import Header from './components/Header/Header'
import DiceRoller from './components/DiceRoller/DiceRoller';
import Footer from './components/Footer/Footer';

export default function App() {
  //#region Add Cards on Load
  const [cardList, setCardList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/get-cards").then(response => {
      addCards(response);
    })
    document.title = "RPG Dice Roller | Player Sheet Manager"
  }, [])
    //#endregion Add Cards on Load

  //#region Update Card
  const updateCard = () => {
    setCardList([]);
    setTimeout(() => {
      Axios.get("http://localhost:3001/get-cards").then(response => {
        addCards(response);
      })
    }, 100);
  }
  //#endregion Update Card

  //#region Add Cards
  const addCards = (response) => {
    for (let i = 0; i < response.data.length; i++) {
      let data = response.data[i];
      setCardList(cardList => [
        ...cardList,
        <Card
          // Card Tab 1
          updateCard=       {updateCard}
          idcard=           {data.idcard}
          playerName=       {data.playerName}
          characterName=    {data.characterName}
          characterRace=    {data.characterRace}
          characterClass=   {data.characterClass}
          cardBorderColor=  {data.cardBorderColor}
          cardImageLink=    {data.cardImageLink}
          imageSizePercent= {data.imageSizePercent}
          imagePosX=        {data.imagePosX}
          imagePosY=        {data.imagePosY}
          // Card Tab 2
          abilityLevel=         {data.abilityLevel}
          abilityXp=            {data.abilityXp}
          abilityAc=            {data.abilityAc}
          abilityStrength=      {data.abilityStrength}
          abilityDexterity=     {data.abilityDexterity}
          abilityConstitution=  {data.abilityConstitution}
          abilityIntelligence=  {data.abilityIntelligence}
          abilityWisdom=        {data.abilityWisdom}
          abilityCharism=       {data.abilityCharism}
          abilityInitiative=    {data.abilityInitiative}
          abilityCurrentHp=     {data.abilityCurrentHp}
          abilityTemporaryHp=   {data.abilityTemporaryHp}
          // Card Tab 3
          personalityTendency=  {data.personalityTendency}
          personalityTraits=    {data.personalityTraits}
          personalityIdeals=    {data.personalityIdeals}
          personalityOther=     {data.personalityOther}
          // Card Tab 4
          proficiencesProficiences= {data.proficiencesProficiences}
          proficiencesLanguages=    {data.proficiencesLanguages}
          proficiencesOther=        {data.proficiencesOther}
          // Card Tab 5
          attacksItems={data.attacksItems}
          // Card Tab 6
          equipmentItems={data.equipmentItems}
          // Card Tab 7
          otherNotes={data.otherNotes}
        />
      ])
    }
  }
  //#endregion Add Cards

  //#region Add Card Button
  const addCardButton = (
    // Card Tab 1
    playerName="",
    characterName="",
    characterRace="",
    characterClass="",
    cardBorderColor="#fff",
    cardImageLink="",
    imageSizePercent=120,
    imagePosX=50,
    imagePosY=0,
    // Card Tab 2
    abilityLevel="",
    abilityXp="",
    abilityAc="",
    abilityStrength="",
    abilityDexterity="",
    abilityConstitution="",
    abilityIntelligence="",
    abilityWisdom="",
    abilityCharism="",
    abilityInitiative="",
    abilityCurrentHp="",
    abilityTemporaryHp="",
    // Card Tab 3
    personalityTendency="",
    personalityTraits="",
    personalityIdeals="",
    personalityOther="",
    // Card Tab 4
    proficiencesProficiences="",
    proficiencesLanguages="",
    proficiencesOther="",
    // Card Tab 5
    attacksItems="",
    // Card Tab 6
    equipmentItems="",
    // Card Tab 7
    otherNotes="",
  ) => {
    Axios.post("http://localhost:3001/add", {
      // Card Tab 1
      playerName: playerName,
      characterName: characterName,
      characterRace: characterRace,
      characterClass: characterClass,
      cardBorderColor: cardBorderColor,
      cardImageLink: cardImageLink,
      imageSizePercent: imageSizePercent,
      imagePosX: imagePosX,
      imagePosY: imagePosY,
      // Card Tab 2
      abilityLevel: abilityLevel,
      abilityXp: abilityXp,
      abilityAc: abilityAc,
      abilityStrength: abilityStrength,
      abilityDexterity: abilityDexterity,
      abilityConstitution: abilityConstitution,
      abilityIntelligence: abilityIntelligence,
      abilityWisdom: abilityWisdom,
      abilityCharism: abilityCharism,
      abilityInitiative: abilityInitiative,
      abilityCurrentHp: abilityCurrentHp,
      abilityTemporaryHp: abilityTemporaryHp,
      // Card Tab 3
      personalityTendency: personalityTendency,
      personalityTraits: personalityTraits,
      personalityIdeals: personalityIdeals,
      personalityOther: personalityOther,
      // Card Tab 4
      proficiencesProficiences: proficiencesProficiences,
      proficiencesLanguages: proficiencesLanguages,
      proficiencesOther: proficiencesOther,
      // Card Tab 5
      attacksItems: attacksItems,
      // Card Tab 6
      equipmentItems: equipmentItems,
      // Card Tab 7
      otherNotes: otherNotes,
    }).then(updateCard())
  }
  //#endregion Add Card Button

  //#region Toggle Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const cssRootVar = [
    "--dm-primary-color",
    "--dm-secondary-color",
    "--dm-background-color",
    "--dm-title-color",
    "--dm-text-color",
    "--dm-input-color",
    "--dm-border-color",
    "--dm-card-primary-color",
    "--dm-card-secondary-color",
    "--dm-invert-color",
    "--dm-invert-color-full",
    "--dm-ac-input-color",
  ]
  const lightStyle = [
    "#aaa", //primary-color
    "#eee", //secondary-color
    "#eee", //background-color
    "#333", //title-color
    "#000", //text-color
    "#ddd", //input-color
    "#707070", //border-color
    "#fff", //card-primary-color
    "#ccc", //card-secondary-color
    "70%",  //invert-color
    "100%", //invert-color-full
    "#fff", //ac-input-color
  ]
  const darkStyle = [
    "#222222",    //primary-color
    "#080808",    //secondary-color
    "#000000f6",  //background-color
    "#adadad",    //title-color
    "#fff",       //text-color
    "#202020",    //input-color
    "#aaa",       //border-color
    "#141414",    //card-primary-color
    "#080808",    //card-secondary-color
    "invert(0%)", //invert-color
    "invert(0%)", //invert-color-full
    "#000"        //ac-input-color
  ]
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
    let styleMode = [];
    darkMode ? styleMode = darkStyle : styleMode = lightStyle;
    for (let i = 0; i < cssRootVar.length; i++) {
      document.documentElement.style.setProperty(cssRootVar[i], styleMode[i])
    }
    localStorage.setItem("darkMode", darkMode);
  }
  const loadDarkMode = () => {
    let darkModeStored = localStorage.getItem("darkMode") === "true" ? true : false;
    setDarkMode(!darkModeStored);

    let styleMode = [];
    darkModeStored ? styleMode = darkStyle : styleMode = lightStyle;
    for (let i = 0; i < cssRootVar.length; i++) {
      document.documentElement.style.setProperty(cssRootVar[i], styleMode[i])
    }
  }
  useEffect(() => {
    loadDarkMode();
  }, [])
  //#endregion Toggle Dark Mode

  return (
    <div className='App--background'>
      <div className="App-header">
        <Header
          darkMode={darkMode}
          changeDarkMode={changeDarkMode}
        />
      </div>
      <div className="App-dices">
        <DiceRoller/>
      </div>
      <div className={'App--line '+(darkMode ? 'App--line-lm' : '')}></div>

      <div className='App-cards'>
        {cardList}
        <div className='card-add' onClick={() => addCardButton()}>+</div>
      </div>
      <div className={'App--line '+(darkMode ? 'App--line-lm' : '')}></div>

      <div className='App-footer'>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}