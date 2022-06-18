import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './CardProficiences.css';

export default function CardProficiences(props) {
  return (
    <div className={"card-content "+props.showContent}>
      <div className="proficiences-content styledScrollbar">
        <div className='proficiences-item'>
          <span className="proficiences-item--title">Proficiences</span>
          <TextareaAutosize
            className="proficiences-item--textarea textarea styledScrollbar"
            onChange={(e) => props.changeProficiences("proficiences", e.target.value)}
            defaultValue={props.proficiencesProficiences}
            spellCheck='false'
          />
        </div>
        <div className='proficiences-item'>
          <span className="proficiences-item--title">Languages</span>
          <TextareaAutosize
            className="proficiences-item--textarea textarea styledScrollbar"
            onChange={(e) => props.changeProficiences("languages", e.target.value)}
            defaultValue={props.proficiencesLanguages}
            spellCheck='false'
          />
        </div>
        <div className='proficiences-item'>
          <span className="proficiences-item--title">Other</span>
          <TextareaAutosize
            className="proficiences-item--textarea textarea styledScrollbar"
            onChange={(e) => props.changeProficiences("other", e.target.value)}
            defaultValue={props.proficiencesOther}
            spellCheck='false'
          />
        </div>
      </div>
    </div>
  )
}