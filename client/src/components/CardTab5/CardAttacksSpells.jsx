import { useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import { v4 as uuidv4 } from 'uuid';
import TitleCase from '../Functions/TitleCase';
import './CardAttacksSpells.css';

export default function CardAttacksSpells(props) {
  // Contém todos os itens de ataque em formato html
  const [attackItems, setAttackItems] = useState([]);

  // Adiciona um item à lista de itens
  const addAttackItem = (itemName, itemDamage, itemBonus) => {
    setAttackItems(attackItems => [...attackItems, 
      (<div key={Math.random()}>
        {attackItem("name", itemName)}
        {attackItem("damage", itemDamage)}
        {attackItem("bonus", itemBonus)}
      </div>)
    ])
  }

  // Modelo para os inputs que irão compor cada item da lista
  const attackItem = (type, value) => {
    return (
      <input
        name={`attack${TitleCase(type)}`}
        className={`input attack-item--${type}`}
        type="text" 
        onChange={() => saveItems()}
        onClick={(e) => deleteItems(e)}
        defaultValue={value}
        key={Math.random()}
      />
    )
  }

  // Load items
  const loadItems = () => {
    let attacksItems = props.attacksItems.split(',');
    for (let i = 0; i < attacksItems.length/3; i++) {
      addAttackItem (
        attacksItems[i], 
        attacksItems[i+attacksItems.length/3], 
        attacksItems[i+2*(attacksItems.length/3)]
      )
    }
  }
  useEffect(() => {
    loadItems();
  },[])

  // Formata os dados dos itens em formato array, e manda para o componente pai
  const formId = `attackItemsForm-${uuidv4()}`;
  const saveItems = () => {
    var formData =  new FormData(attackItemsFormRef.current);
    var attackName = formData.getAll('attackName');
    var attackDamage = formData.getAll('attackDamage');
    var attackBonus = formData.getAll('attackBonus');
    var attackItems = [attackName, attackDamage, attackBonus];
    props.changeAttacksItems(attackItems.toString());
  }
  
  // Flag de controle para o uso da opção Delete Item
  const [deleteActive, setDeleteActive, deleteActiveRef] = useState(false);
  // Deleta um item da lista
  const deleteItems = (e) => {
    if (deleteActiveRef.current) {
      e.currentTarget.parentNode.remove();
      props.setUnsavedItems(true);
      saveItems();
    }
  }

  // Contador de quantos elementos existem na lista de ataques
  const [attackItemsFormCount, setAttackItemsFormCount] = useState(0);
  let attackItemsFormRef = useRef();
  useEffect(() => {
    setAttackItemsFormCount(attackItemsFormRef.current.childNodes.length);
  })
  
  return (
    <div className={"card-content styledScrollbar "+props.showContent}>
      <div className='attacks-content'>
        {
          attackItemsFormCount > 0
          ? (
          <div className='attacks-item--title'>
            <span className='attack-title--name'>Name</span>
            <span className='attack-title--damage'>Damage/Type</span>
            <span className='attack-title--bonus'>Bonus</span>
          </div>
          ) : ""
        }
        <form 
          id={formId}
          ref={attackItemsFormRef}
          className=
          {
            deleteActiveRef.current 
            ? "attacks-items attacks-items--delete-item" 
            : "attacks-items"
          }
          spellCheck='false'
          >{attackItems}
        </form>
        <button 
          className=
          {
            (
              attackItemsFormCount > 0 
              ? 'attacks-item--add button '
              : 'attacks-item--add-margin-top button '
            ) +
            (
              deleteActiveRef.current
              ? 'attacks-item--add-disabled button'
              : ''
            )
          }
          onClick={() => {addAttackItem(); props.setUnsavedItems(true)}}
          >Add Attack/Spell
        </button>
        <button
          className=
          {
            'attacks-item--delete button ' + 
            (deleteActive ? 'attacks-item--delete-active' : '')
          }
          onClick={() => setDeleteActive(!deleteActive)}
        >{deleteActive ? "Cancel" : "Delete Item"}
        </button>
      </div>
    </div>
  )
}