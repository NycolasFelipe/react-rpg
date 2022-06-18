import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize'
import './CardEquipment.css';

export default function CardEquipment(props) {
  const [equipmentItems, setEquipmentItems] = useState([]);
  const loadItems = (index) => {
    let newEquipmentItems = "";
    props.equipmentItems 
    ? newEquipmentItems = props.equipmentItems.split(',')
    : newEquipmentItems = ["","",""];
    setEquipmentItems(newEquipmentItems);
  }
  useEffect(() => {
    loadItems();
  }, [])

  const changeEquipmentItems = (index, value) => {
    let newEquipmentItems = equipmentItems;
    newEquipmentItems[index] = value;
    setEquipmentItems(newEquipmentItems);

    var equipmentItemsString = `${equipmentItems[0]},${equipmentItems[1]},${equipmentItems[2]}`;
    props.changeEquipmentItems(equipmentItemsString);
  }

  return (
    <div className={`card-content styledScrollbar ${props.showContent}`}>
      <div className='content-equipment'>
        <div className='equipment-item'>
          <div className='equipment-item-header'>
            <img 
              className='equipment-item--icon'
              src="/images/weapons.svg" 
              alt="Weapons equipment icon"
              name="equipment-weapons"
              id="equipmentWeapons"
            />
          </div>
          <TextareaAutosize
            className='equipment-item--textarea textarea styledScrollbar'
            minRows='3'
            spellCheck='false'
            placeholder='Weapons & tools...'
            defaultValue={equipmentItems[0]}
            onChange={(e) => changeEquipmentItems(0, e.target.value)}
          />
        </div>
        <div className='equipment-item'>
          <div className='equipment-item-header'>
            <img 
              className='equipment-item--icon'
              src="/images/gold.svg" 
              alt="Gold equipment icon"
              name="equipment-gold"
              id="equipmentGold"
            />
          </div>
          <TextareaAutosize
            className='equipment-item--textarea textarea styledScrollbar'
            minRows='2'
            spellCheck='false'
            placeholder='Gold & money...'
            autoFocus
            defaultValue={equipmentItems[1]}
            onChange={(e) => changeEquipmentItems(1, e.target.value)}
          />
        </div>
        <div className='equipment-item'>
          <div className='equipment-item-header'>
            <img 
              className='equipment-item--icon'
              src="/images/inventory.svg" 
              alt="Inventory equipment icon"
              name="equipment-inventory"
              id="equipmentInventory"
            />
          </div>
          <TextareaAutosize
            className='equipment-item--textarea textarea styledScrollbar'
            minRows='3'
            spellCheck='false'
            placeholder='Inventory items...'
            defaultValue={equipmentItems[2]}
            onChange={(e) => changeEquipmentItems(2, e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}