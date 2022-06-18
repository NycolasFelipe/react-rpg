import React, { useState } from 'react';
import './DiceRoller.css';

export default function DiceRoller() {
  // Gera um id único baseado na data atual
  const uniqueID = Date.now();

  // Contém todos os dados em elemento html gerados em addDice()
  const [dices, setDices] = useState([]);

  // Contém todos os dados na forma ['d4', 'd16, ...] gerados em addDice()
  // Os indexes dos elementos em dices e dicesList são correspondentes
  const [dicesList, setDicesList] = useState([]);

  // Contém todos os elementos correspondentes aos em dices, porém com uma estrutura
  // html para exibir o resultado dentro do dado
  const [dicesResults, setDicesResults] = useState([]);

  // Contém todos os dados na forma ['d4', 'd16, ...] gerados em rollDice()
  // Os indexes dos elementos em dicesResult e dicesListResult são correspondentes
  let dicesListResult = [];

  // Contém a pontuação total ao final da rolagem
  let [dicesTotal, setDicesTotal] = useState(0);

  // Armazena o histórico de rolagens
  const [history, setHistory] = useState("");
  
  // Função para gerar um valor aleatório
  const generateRandomValue = (min, max) => Math.floor((Math.random()*max)+min);

  // Retorna o horário atual em formato string
  const currentTime = () => {
    const today = new Date();
    const hour = today.getHours();
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hour} : ${minutes}`;
  }

  // Clear dices when clicking them
  const clearDices = (type) => {
    if (type === 'before-roll') {
      setDices([]);
      setDicesList([]);
    }
    else if (type === 'after-roll') {
      setDicesResults([]);
      dicesListResult = [];
      setDicesTotal(0);
    }
  }

  // Plain Dice Image
  const diceImg = (dice) => {
    return (
      <div className='rolled-dices-div'>
        <img 
          src={`/images/${dice}.png`}
          className='rolled-dices-dice'
          key={uniqueID}
          alt='dice'
          onClick={() => clearDices('before-roll')}
          />
      </div>
    )
  }
  // End Plain Dice Image

  // Dice Image With Value Inside
  const diceImgValue = (dice, diceValue) => {
    return (
      <div className='rolled-dices-div'>
        <img 
          src={`/images/${dice}.png`}
          className='rolled-dices-dice-value'
          key={uniqueID}
          alt='dice'
          onClick={() => clearDices('after-roll')}
          />
        <span className='rolled-dices-value'>
          {diceValue}
        </span>
      </div>
    )
  }
  // End Dice Image With Value Inside

  // Dice Image Button
  const diceImgButton = (dice) => {
    return (
      <div>
        <img 
          className="dice-img"
          src={`/images/${dice}.png`}
          alt={`${dice} dice`}
          onClick={() => addDice(dice)}
        />
        <span className="dice-value">{dice}</span>
      </div>
    )
  }
  // End Dice Image Button

  // Current Time Div
  const currentTimeDiv = (
    <div className='current-time'>
      [ {currentTime()} ]
    </div>
  )
  // End Current Time Div

  // History Div 
  const historyDivElement = (i, dicesTotalSum) => {
    return (
      <div className='dice-result-line'>
        <p>
          <span className={i === 0 ? 'dice-dummy' : ''}></span>
          <span className='dice-list'>{dicesList[i]}</span>
          <span className={`dice-result dice-color-${dicesList[i]}`}>
            ({dicesListResult[i]})
          </span>
          <span className='dice-plus'>{i !== dicesList.length-1 ? '+' : '= '}</span>
          {
            i === dicesList.length-1 
            ? <span className='dice-total'>{dicesTotalSum}</span> 
            : ''
          }
        </p>
      </div>
    )
  }
  // End History Div 

  // History Clear Button
  const historyClearButton =  (
    <button 
      className='history-clear-button button'
      onClick={() => setHistory("")}
      >clear
    </button>
  )
  // End History Clear Button

  // Add Dice
  const addDice = (diceValue) => {
    if (dices.length < 9) {
      setDices((dices) => [...dices, diceImg(diceValue)])
      setDicesList((dicesList) => [...dicesList, `${diceValue}`])
    }
    clearDices('after-roll')
    setDicesTotal(0);
  }
  // End Add Dice

  // Roll Dice
  const rollDice = () => {
    let d4 = 0, d6 = 0, d10 = 0, d12 = 0, d20 = 0;
    let randomD4 = 0, randomD6 = 0, randomD10 = 0, randomD12 = 0, randomD20 = 0;

    dicesList.forEach(dice => {
      switch(dice) {
        case 'd4': {
          randomD4 = generateRandomValue(1, 4); 
          d4 += randomD4;
          dicesListResult.push(randomD4);
        } break;

        case 'd6': {
          randomD6 = generateRandomValue(1, 6);
          d6 += randomD6;
          dicesListResult.push(randomD6);
        } break;

        case 'd10': {
          randomD10 = generateRandomValue(1, 10);
          d10 += randomD10;
          dicesListResult.push(randomD10);
        } break;

        case 'd12': {
          randomD12 = generateRandomValue(1, 12);
          d12 += randomD12;
          dicesListResult.push(randomD12);
        } break;

        case 'd20': {
          randomD20 = generateRandomValue(1, 20);
          d20 += randomD20;
          dicesListResult.push(randomD20);
         } break;
      }

      const rolledDicesValues = () => {
        switch(dice) {
          case 'd4': return randomD4;
          case 'd6': return randomD6;
          case 'd10': return randomD10;
          case 'd12': return randomD12;
          case 'd20': return randomD20;
        }
      }
      const diceValue = rolledDicesValues();

      setDicesResults((dicesResults) => [...dicesResults,
        diceImgValue(dice, diceValue)
      ])
    })

    let dicesTotalSum = d4+d6+d10+d12+d20;
    if (dicesTotalSum === 0) setDicesResults([]);
    setDicesTotal(dicesTotalSum);

    if (dicesList.length > 0) {
      setHistory((history) => [...history, currentTimeDiv]);

      for (let i = 0; i < dicesList.length; i++) {
        setHistory((history) => [...history, historyDivElement(i, dicesTotalSum)]);
      }

      setDices([]);
      setDicesList([]);
    }
    scrollToHistoryBottom();
  }
  // End Roll Dice

  // Scroll to History Bottom
  var Scroll = require('react-scroll');
  var Element = Scroll.Element;
  var scroller = Scroll.scroller;
  
  const scrollToHistoryBottom = () => {
    scroller.scrollTo('scrollToElement', {
      smooth: true,
      containerId: 'container-history-text',
    })
  }
  // End Scroll to History Bottom

  return (
    <div className="container-dice-roller">
      <div className="rolled-dices">
        <span className="rolled-dices-title">Rolled Dices</span>
        <span className="rolled-dices-total">Total: {dicesTotal}</span>
        {dices}
        {dicesResults}
      </div>
      <div className="container-dices">
        <div className="dices-roll">
          <span className='dices-roll-title'>Roll Dice</span>
          <div className="dices">
            {diceImgButton("d4")}
            {diceImgButton("d6")}
            {diceImgButton("d10")}
            {diceImgButton("d12")}
            {diceImgButton("d20")}
          </div>
          <button 
            className="dice-roll-btn button"
            onClick={() => rollDice()}
            >Roll
          </button>
        </div>
        <div className="dices-history">
          <span className='dices-history-title'>History</span>
          {historyClearButton}
          <div className='dices-history-text' id='container-history-text'>
            {history}
            <Element name='scrollToElement'></Element>
          </div>
        </div>
      </div>
    </div>
  );
}