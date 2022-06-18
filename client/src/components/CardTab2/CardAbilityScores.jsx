import React from 'react';
import TitleCase from '../Functions/TitleCase';
import './CardAbilityScores.css'

export default function CardAbilityScores(props) {
  //#region Get Data from Parent
  const abilityLevel = props.abilityLevel;
  const abilityXp = props.abilityXp;
  const abilityAc = props.abilityAc;
  const abilityStrength = props.abilityStrength;
  const abilityDexterity = props.abilityDexterity;
  const abilityConstitution = props.abilityConstitution;
  const abilityIntelligence = props.abilityIntelligence;
  const abilityWisdom = props.abilityWisdom;
  const abilityCharism = props.abilityCharism;
  const abilityInitiative = props.abilityInitiative;
  const abilityCurrentHp = props.abilityCurrentHp;
  const abilityTemporaryHp = props.abilityTemporaryHp;
  //#endregion Get Data from Parent

  //#region Display Ability Value
  const displayAbilityValue = (type) => {
    let value = "";
    switch (type) {
      case "level":         value = abilityLevel; break;
      case "xp":            value = abilityXp; break;
      case "ac":            value = abilityAc; break;
      case "strength":      value = abilityStrength; break;
      case "dexterity":     value = abilityDexterity; break;
      case "constitution":  value = abilityConstitution; break;
      case "intelligence":  value = abilityIntelligence; break;
      case "wisdom":        value = abilityWisdom; break;
      case "charism":       value = abilityCharism; break;
      case "initiative":    value = abilityInitiative; break;
      case "current":       value = abilityCurrentHp; break;
      case "temporary":     value = abilityTemporaryHp; break;
    }
    return value;
  }
  //#endregion Display Ability Value

  //#region Ability Top Left
  const abilityTopLeft = (type) => {
    return (
      <div className='ability-level'>
        <img 
          className='ability-top--icon'
          src={`/images/ability_${type}.svg`}
          alt={type}
        />
        <input 
          className='ability-top--input input'
          type="text" 
          name={`ability${TitleCase(type)}`}
          id={`ability${TitleCase(type)}`}
          placeholder={TitleCase(type)}
          onChange={(e) => props.changeAbility(type, e.target.value)}
          value={displayAbilityValue(type)}
          spellCheck='false'
        />
      </div>
    )
  }
  //#endregion Ability Top Left

  //#region Ability Top Right
  const abilityTopRight = (
    <div className='ability-ac'>
      <img 
        className='ability-ac--icon'
        src="/images/ability_ac.svg" 
        alt="ac points"
      />
      <input 
        className='ability-ac--input input'
        type="text" 
        name="acPoints" 
        id="aPoints"
        placeholder='00'
        onChange={(e) => props.changeAbility("ac", e.target.value)}
        value={displayAbilityValue("ac")}
        spellCheck='false'
      />
      <div className="ability-initiative">
        <input 
          className='ability-initiative--input input'
          type="text"
          placeholder='Initiative'
          onChange={(e) => props.changeAbility("initiative", e.target.value)}
          value={displayAbilityValue("initiative")}
          spellCheck='false'
        />
      </div>
    </div>
  )
  //#endregion Ability Top Right

  //#region Ability Middle
  const abilityMiddle = (type) => {
    return (
    <div className={`ability-${type}`}>
        <span className='ability-middle--name'>{TitleCase(type)}</span>
        <input 
          className='ability-middle--input input'
          type="text" 
          name={`ability${TitleCase(type)}`}
          id={`ability${TitleCase(type)}`}
          onChange={(e) => props.changeAbility(type, e.target.value)}
          value={displayAbilityValue(type)}
          spellCheck='false'
        />
      </div>
    )
  }
  //#endregion

  //#region Ability Bottom
  const abilityBottom = (type) => {
    return (
      <div className={`ability-${type}-hp`}>
        <img 
          className='ability-hp--icon'
          src={`/images/ability_${type}-hp.svg`} 
          alt=""
        />
        <input 
          className='ability-bottom--input input'
          type="text" 
          name={`ability${TitleCase(type)}Hp`}
          id={`ability${TitleCase(type)}Hp`}
          placeholder={`${TitleCase(type)} HP`}
          onChange={(e) => props.changeAbility(type, e.target.value)}
          value={displayAbilityValue(type)}
          spellCheck='false'
        />
      </div>
    )
  }
  //#endregion Ability Bottom

  return (
    <div className={`card-content ${props.showContent}`}>
      <div className='content-ability'>
        <div className='content-ability-top'>
          <div className='content-ability-top-left'>
            {abilityTopLeft("level")}
            {abilityTopLeft("xp")}
          </div>
          <div className="content-ability-top-right">
            {abilityTopRight}
          </div>
        </div>
        <div className="content-ability-middle">
          {abilityMiddle("strength")}
          {abilityMiddle("dexterity")}
          {abilityMiddle("constitution")}
          {abilityMiddle("intelligence")}
          {abilityMiddle("wisdom")}
          {abilityMiddle("charism")}
        </div>
        <div className="content-ability-bottom">
            {abilityBottom("current")}
            {abilityBottom("temporary")}
        </div>
      </div>
    </div>
  )
}