import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './CardOtherNotes.css';

export default function CardOtherNotes(props) {
  return (
    <div className={`card-content styledScrollbar ${props.showContent}`}>
      <div className='content-other'>
        <div className='other-item'>
          <span className='other-item--title'>Other information and notes</span>
          <TextareaAutosize
            className='other-item--textarea textarea styledScrollbar'
            minRows='13'
            spellCheck='false'
            defaultValue={props.otherNotes}
            onChange={(e) => props.changeOtherNotes(e.target.value)}
          />
        </div> 
      </div>
    </div>
  )
}