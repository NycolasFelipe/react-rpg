import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './Card.css';
import CardGeneralInfo from '../CardTab1/CardGeneralInfo';
import CardAbilityScores from '../CardTab2/CardAbilityScores';
import CardPersonality from '../CardTab3/CardPersonality';
import CardProficiences from '../CardTab4/CardProficiences';
import CardAttacksSpells from '../CardTab5/CardAttacksSpells';
import CardEquipment from '../CardTab6/CardEquipment';
import CardOtherNotes from '../CardTab7/CardOtherNotes';

export default function Card(props) {
  // Card Tab 1
  //#region Tabs
  // Change Tabs
  const [tabNumber, setTabNumber] = useState(1);
  const checkTabNumber = (number) => {
    return (
      number === tabNumber
      ? "button-tab button-tab--select"
      : "button-tab"
    )
  }
  // End Change Tabs

  // Tab Button
  const[forceTabTitle, setForceTabTitle] = useState("");
  const tabButton = (tabNumber) => {
    return (
      <button 
        className={`${checkTabNumber(tabNumber)}`}
        onClick={() => setTabNumber(tabNumber)}
        onMouseOver={() => setForceTabTitle(tabTitle(tabNumber))}
        onMouseOut={() => setForceTabTitle("")}
        >{tabNumber}
      </button>
    )
  }
  // End Tab Button

  // Tab Title
  const tabTitle = (tabNumber) => {
    let title = "";
    switch(tabNumber){
      case 1: title = "General Information"; break;
      case 2: title = "Ability and Other Scores"; break;
      case 3: title = "Personality"; break;
      case 4: title = "Proficiences & etc"; break;
      case 5: title = "Attacks & Spells"; break;
      case 6: title = "Equipment"; break;
      case 7: title = "Other Notes"; break;
    }
    return <p>{title}</p>
  }
  // End Tab Title
  //#endregion Tabs

  //#region Show/Hide Content
  const showContent = (number) => {
    if (number === tabNumber) return "card-content--show";
    else return "";
  }
  //#endregion Show/Hide Content

  //#region Handle Name
  //Get default values from parent
  const [playerName, setPlayerName] = useState(props.playerName);
  const [characterName, setCharacterName] = useState(props.characterName);
  const [characterRace, setCharacterRace] = useState(props.characterRace);
  const [characterClass, setCharacterClass] = useState(props.characterClass);

  //Get values from child CardGeneralInfo
  const getName = (value, type) => {
    switch(type) {
      case "player": setPlayerName(value); break;
      case "character" : setCharacterName(value); break;
      case "characterRace" : setCharacterRace(value); break;
      case "characterClass" : setCharacterClass(value); break;
    }
  }

  //Format and display name
  const showName = (player, character) => {
    const pName = player ? player : "Player";
    const cName = character ? character : "Character";
    return `${pName} @ ${cName}`;
  }
  const showRaceClass = (characterRace, characterClass) => {
    const cRace = characterRace ? characterRace : "Race";
    const cClass = characterClass ? characterClass : "Class";
    return `(${cRace}/${cClass})`;
  }
  //#endregion Handle Name

  //#region Change Color
  const [cardColor, setCardColor] = useState(props.cardBorderColor);
  const changeColor = (newColor) => setCardColor(newColor);
  //#endregion Change Color

  //#region Card Image Link and Position
  const [cardImageLink, setCardImageLink] = useState(props.cardImageLink);
  const [imageSizePercent, setimageSizePercent] = useState(props.imageSizePercent);
  const [imagePosX, setimagePosX] = useState(props.imagePosX);
  const [imagePosY, setimagePosY] = useState(props.imagePosY);

  const changeImageLink = (newLink) => setCardImageLink(newLink);
  const changeSizePercent = (newSize) => setimageSizePercent(newSize);
  const changePosX = (newPosX) => setimagePosX(newPosX);
  const changePosY = (newPosY) => setimagePosY(newPosY);
  //#endregion Card Image Link and Position
  
  //#region Card Tab 2 - Ability
  const [abilityLevel, setAbilityLevel] = useState(props.abilityLevel);
  const [abilityXp, setAbilityXp] = useState(props.abilityXp);
  const [abilityAc, setAbilityAc] = useState(props.abilityAc);
  const [abilityStrength, setAbilityStrength] = useState(props.abilityStrength);
  const [abilityDexterity, setAbilityDexterity] = useState(props.abilityDexterity);
  const [abilityConstitution, setAbilityConstitution] = useState(props.abilityConstitution);
  const [abilityIntelligence, setAbilityIntelligence] = useState(props.abilityIntelligence);
  const [abilityWisdom, setAbilityWisdom] = useState(props.abilityWisdom);
  const [abilityCharism, setAbilityCharism] = useState(props.abilityCharism);
  const [abilityInitiative, setAbilityInitiative] = useState(props.abilityInitiative);
  const [abilityCurrentHp, setAbilityCurrentHp] = useState(props.abilityCurrentHp);
  const [abilityTemporaryHp, setAbilityTemporaryHp] = useState(props.abilityTemporaryHp);

  const changeAbility = (type, value) => {
    switch(type) {
      case "level":         setAbilityLevel(value); break;
      case "xp":            setAbilityXp(value); break;
      case "ac":            setAbilityAc(value); break;
      case "strength":      setAbilityStrength(value); break;
      case "dexterity":     setAbilityDexterity(value); break;
      case "constitution":  setAbilityConstitution(value); break;
      case "intelligence":  setAbilityIntelligence(value); break;
      case "wisdom":        setAbilityWisdom(value); break;
      case "charism":       setAbilityCharism(value); break;
      case "initiative":    setAbilityInitiative(value); break;
      case "current":       setAbilityCurrentHp(value); break;
      case "temporary":     setAbilityTemporaryHp(value); break;
    }
  }
  //#endregion Ability Values

  //#region Card Tab 3 - Personality
  const [personalityTendency, setPersonalityTendency] = useState(props.personalityTendency);
  const [personalityTraits, setPersonalityTraits] = useState(props.personalityTraits);
  const [personalityIdeals, setPersonalityIdeals] = useState(props.personalityIdeals);
  const [personalityOther, setPersonalityOther] = useState(props.personalityOther);

  const changePersonality = (type, value) => {
    switch(type) {
      case "tendency": setPersonalityTendency(value); break;
      case "traits": setPersonalityTraits(value); break;
      case "ideals": setPersonalityIdeals(value); break;
      case "other": setPersonalityOther(value); break;
    }
  }
  //#endregion Personality Values
  
  //#region Card Tab 4 - Proficiences
  const [proficiencesProficiences, setProficiencesProficiences] = useState(props.proficiencesProficiences);
  const [proficiencesLanguages, setProficiencesLanguages] = useState(props.proficiencesLanguages);
  const [proficiencesOther, setProficiencesOther] = useState(props.proficiencesOther);

  const changeProficiences = (type, value) => {
    switch(type) {
      case "proficiences": setProficiencesProficiences(value); break;
      case "languages": setProficiencesLanguages(value); break;
      case "other": setProficiencesOther(value); break;
    }
  }
  //#endregion Proficiences Values

  //#region Card Tab 5 - Attacks/Spells
  const [attacksItems, setAttacksItems] = useState(props.attacksItems);
  const changeAttacksItems = data => setAttacksItems(data);
  //#endregion Attacks/Spells

  //#region Card Tab 6 - Equipment Values
  const [equipmentItems, setEquipmentItems] = useState(props.equipmentItems);
  const changeEquipmentItems = data => setEquipmentItems(data);
  //#endregion Equipment Values

  //#region Card Tab 7 - Other Notes Values
  const [otherNotes, setOtherNotes] = useState(props.otherNotes);
  const changeOtherNotes = data => setOtherNotes(data);
  //#endregion Other Notes Values

  //#region [Button] Save Card
  const [savedWindowActive, setSavedWindowActive] = useState(false);
  const [unsavedItems, setUnsavedItems] = useState(false);

  const cardButtonSave = () => {
    setSavedWindowActive(!savedWindowActive);
    setTimeout(() => {
      setSavedWindowActive(false);
    }, 1500);
    setUnsavedItems(false);

    Axios.put("http://localhost:3001/save/", {
      idcard: props.idcard,
      // Tab 1
      playerName: playerName,
      characterName: characterName,
      characterRace: characterRace,
      characterClass: characterClass,
      cardBorderColor: cardColor,
      cardImageLink: cardImageLink,
      imageSizePercent: imageSizePercent,
      imagePosX: imagePosX,
      imagePosY: imagePosY,
      // Tab 2
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
      // Tab 3
      personalityTendency: personalityTendency,
      personalityTraits: personalityTraits,
      personalityIdeals: personalityIdeals,
      personalityOther: personalityOther,
      // Tab 4
      proficiencesProficiences: proficiencesProficiences,
      proficiencesLanguages: proficiencesLanguages,
      proficiencesOther: proficiencesOther,
      // Tab 5
      attacksItems: attacksItems,
      // Tab 6
      equipmentItems: equipmentItems,
      // Tab 7
      otherNotes: otherNotes,
    })
  }
  //#endregion [Button] Save Card

  //#region [Button] Delete Card
  const [deleteWindowActive, setDeleteWindowActive] = useState();
  const cardButtonDelete = () => {
    Axios.delete(`http://localhost:3001/delete/${props.idcard}`);
    props.updateCard();
  }
  //#endregion [Button] Delete Card


  return (
    <div 
      className='card' 
      style={{'--dm-card-border-color':cardColor}}
      onKeyDown={() => setUnsavedItems(true)}
    >
      <div className=
        {
          savedWindowActive 
          ? 'card-saved card-saved--show'
          : 'card-saved'
        }
        onClick={() => setSavedWindowActive(false)}
        >Saved ✓
      </div>
      <div className=
        {
          deleteWindowActive
          ? 'card-delete card-delete--show'
          : 'card-delete'
        }
      >
        <span className='card-delete--title'>
          Are you sure you want to delete this card? All data will be lost.
        </span>
        <div className='card-delete-buttons'>
          <button 
            className='card-delete--button-yes button'
            onClick={() => cardButtonDelete()}
            >Yes
          </button>
          <button 
            className='card-delete--button-no button'
            onClick={() => setDeleteWindowActive(false)}
            >No
          </button>
        </div>
      </div>
      <div className='card-details'>
        <span className='card-details--span'>
          {showName(playerName, characterName)}
        </span>
        <span className='card-details--span card-details--minor'>
          {showRaceClass(characterRace, characterClass)}
        </span>
      </div>
      <div className='card-tabs'>
        <span className="card-tabs--title">
          {forceTabTitle ? forceTabTitle : tabTitle(tabNumber)}
        </span>
        <div className="card-tabs--buttons">
          {tabButton(1)}
          {tabButton(2)}
          {tabButton(3)}
          {tabButton(4)}
          {tabButton(5)}
          {tabButton(6)}
          {tabButton(7)}
        </div>
      </div>

      <CardGeneralInfo
        // Show content
        showContent={showContent(1)}
        // Get Data
        getName={getName}
        changeColor={changeColor}
        changeImageLink={changeImageLink}
        changeSizePercent={changeSizePercent}
        changePosX={changePosX}
        changePosY={changePosY}
        setUnsavedItems={setUnsavedItems}
        // Content Tab 1
        playerName={playerName}
        characterName={characterName}
        characterRace={characterRace}
        characterClass={characterClass}
        cardImageLink={cardImageLink}
        imageSizePercent={imageSizePercent}
        imagePosX={imagePosX}
        imagePosY={imagePosY}
      />
      <CardAbilityScores
        // Show content
        showContent={showContent(2)}
        // Get Data
        changeAbility={changeAbility}
        // Content Tab 2
        abilityLevel={abilityLevel}
        abilityXp={abilityXp}
        abilityAc={abilityAc}
        abilityStrength={abilityStrength}
        abilityDexterity={abilityDexterity}
        abilityConstitution={abilityConstitution}
        abilityIntelligence={abilityIntelligence}
        abilityWisdom={abilityWisdom}
        abilityCharism={abilityCharism}
        abilityInitiative={abilityInitiative}
        abilityCurrentHp={abilityCurrentHp}
        abilityTemporaryHp={abilityTemporaryHp}
      />
      <CardPersonality
        // Show content
        showContent={showContent(3)}
        // Get Data
        changePersonality={changePersonality}
        // Content Tab 3
        personalityTendency={personalityTendency}
        personalityTraits={personalityTraits}
        personalityIdeals={personalityIdeals}
        personalityOther={personalityOther}
      />
      <CardProficiences
        // Show content
        showContent={showContent(4)}
        // Get Data
        changeProficiences={changeProficiences}
        //Content Tab 4
        proficiencesProficiences={proficiencesProficiences}
        proficiencesLanguages={proficiencesLanguages}
        proficiencesOther={proficiencesOther}
      />
      <CardAttacksSpells
        // Show content
        showContent={showContent(5)}
        // Get Data
        changeAttacksItems={changeAttacksItems}
        setUnsavedItems={setUnsavedItems}
        // Content Tab 5
        attacksItems={attacksItems}
      />
      <CardEquipment
        // Show content
        showContent={showContent(6)}
        // Get Data
        changeEquipmentItems={changeEquipmentItems}
        // Content Tab 6
        equipmentItems={equipmentItems}
      />
      <CardOtherNotes
        // Show content
        showContent={showContent(7)}
        // Get Data
        changeOtherNotes={changeOtherNotes}
        // Content Tab 7
        otherNotes={otherNotes}
      />

      <div className="card-buttons">
        <button 
          className='button card-buttons--save'
          onClick={() => cardButtonSave()}
        >{unsavedItems ? 'Save*' : 'Save'}</button>
        <button 
          className='button card-buttons--delete'
          onClick={() => setDeleteWindowActive(true)}
          >Delete
        </button>
      </div>
    </div>
  )
}