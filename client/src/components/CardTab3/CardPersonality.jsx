import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import TitleCase from '../Functions/TitleCase';
import './CardPersonality.css';

export default function CardPersonality(props) {
  //#region Get Data from Parent
  const personalityTendency = props.personalityTendency;
  const personalityTraits = props.personalityTraits;
  const personalityIdeals = props.personalityIdeals;
  const personalityOther = props.personalityOther;
  //#endregion Get Data from Parent

  //#region Display Personality Value
  const displayPersonalityValue = (type) => {
    let value = "";
    switch (type) {
      case "tendency": value = personalityTendency; break;
      case "traits": value = personalityTraits; break;
      case "ideals": value = personalityIdeals; break;
      case "other": value = personalityOther; break;
    }
    return value;
  }
  //#endregion Display Personality Value

  //#region Personality Item
  const personalityItem = (type) => {
    return (
      <div className="personality-item">
        <span className="personality-item--title">{TitleCase(type)}</span>
          <TextareaAutosize
            className="personality-item--textarea textarea styledScrollbar"
            name={`personality-${type}`} 
            id={`personality-${type}`}
            onInput={(e) => props.changePersonality(type, e.target.value)}
            value={displayPersonalityValue(type)}
            spellCheck='false'
          />
      </div>
    )
  }
  //#endregion Personality Item

  return (
    <div className={"card-content "+props.showContent}>
      <div className="personality-content styledScrollbar">
        {personalityItem("tendency")}
        {personalityItem("traits")}
        {personalityItem("ideals")}
        {personalityItem("other")}
      </div>
    </div>
  )
}