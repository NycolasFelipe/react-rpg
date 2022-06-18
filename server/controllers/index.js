import mysql from 'mysql2';

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "n4R$qMRVC#3!oo3cRQfW",
  database: "react-rpg",
})

export const addCard = (req, res) => {
  const cardData = {
    // Card Tab 1
    playerName:         req.body.playerName,
    characterName:      req.body.characterName,
    characterRace:      req.body.characterRace,
    characterClass:     req.body.characterClass,
    cardBorderColor:    req.body.cardBorderColor,
    cardImageLink:      req.body.cardImageLink,
    imageSizePercent:   req.body.imageSizePercent,
    imagePosX:          req.body.imagePosX,
    imagePosY:          req.body.imagePosY,
    // Card Tab 2
    abilityLevel:         req.body.abilityLevel,
    abilityXp:            req.body.abilityXp,
    abilityAc:            req.body.abilityAc,
    abilityStrength:      req.body.abilityStrength,
    abilityDexterity:     req.body.abilityDexterity,
    abilityConstitution:  req.body.abilityConstitution,
    abilityIntelligence:  req.body.abilityIntelligence,
    abilityWisdom:        req.body.abilityWisdom,
    abilityCharism:       req.body.abilityCharism,
    abilityInitiative:    req.body.abilityInitiative,
    abilityCurrentHp:     req.body.abilityCurrentHp,
    abilityTemporaryHp:   req.body.abilityTemporaryHp,
    // Card Tab 3
    personalityTendency:  req.body.personalityTendency,
    personalityTraits:    req.body.personalityTraits,
    personalityIdeals:    req.body.personalityIdeals,
    personalityOther:     req.body.personalityOther,
    // Card Tab 4
    proficiencesProficiences: req.body.proficiencesProficiences,
    proficiencesLanguages:    req.body.proficiencesLanguages,
    proficiencesOther:        req.body.proficiencesOther,
    // Card Tab 5
    attacksItems: req.body.attacksItems,
    // Card Tab 6
    equipmentItems: req.body.equipmentItems,
    // Card Tab 7
    otherNotes: req.body.otherNotes,
  }
  const cardDataLength = Object.keys(cardData).length;

  let SQL = "INSERT INTO cards (";
  let SQLData = [];

  Object.getOwnPropertyNames(cardData).forEach((item, i) => {
    i === cardDataLength-1
    ? SQL += `${item}) VALUES (`
    : SQL += `${item}, `
  })
  Object.values(cardData).forEach((item, i) => {
    i === cardDataLength-1
    ? SQL += "?)"
    : SQL += "?,"
    SQLData.push(item);
  })

  db.query(SQL, SQLData, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
}

export const getCards = (req, res) => {
  let SQL = "SELECT * from cards";
  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
}

export const saveCard = (req, res) => {
  const cardData = {
    idcard: req.body.idcard,
    // Card Tab 1
    playerName:         req.body.playerName,
    characterName:      req.body.characterName,
    characterRace:      req.body.characterRace,
    characterClass:     req.body.characterClass,
    cardBorderColor:    req.body.cardBorderColor,
    cardImageLink:      req.body.cardImageLink,
    imageSizePercent:   req.body.imageSizePercent,
    imagePosX:          req.body.imagePosX,
    imagePosY:          req.body.imagePosY,
    // Card Tab 2
    abilityLevel:         req.body.abilityLevel,
    abilityXp:            req.body.abilityXp,
    abilityAc:            req.body.abilityAc,
    abilityStrength:      req.body.abilityStrength,
    abilityDexterity:     req.body.abilityDexterity,
    abilityConstitution:  req.body.abilityConstitution,
    abilityIntelligence:  req.body.abilityIntelligence,
    abilityWisdom:        req.body.abilityWisdom,
    abilityCharism:       req.body.abilityCharism,
    abilityInitiative:    req.body.abilityInitiative,
    abilityCurrentHp:     req.body.abilityCurrentHp,
    abilityTemporaryHp:   req.body.abilityTemporaryHp,
    // Card Tab 3
    personalityTendency:  req.body.personalityTendency,
    personalityTraits:    req.body.personalityTraits,
    personalityIdeals:    req.body.personalityIdeals,
    personalityOther:     req.body.personalityOther,
    // Card Tab 4
    proficiencesProficiences: req.body.proficiencesProficiences,
    proficiencesLanguages:    req.body.proficiencesLanguages,
    proficiencesOther:        req.body.proficiencesOther,
    // Card Tab 5
    attacksItems: req.body.attacksItems,
    // Card Tab 6
    equipmentItems: req.body.equipmentItems,
    // Card Tab 7
    otherNotes: req.body.otherNotes,
  }
  const cardDataLength = Object.keys(cardData).length;

  let SQL = "UPDATE cards SET ";
  let SQLData = [];

  Object.getOwnPropertyNames(cardData).forEach((item, i) => {
    i === cardDataLength-1
    ? SQL += `${item} = ? WHERE idcard = ${cardData.idcard}`
    : SQL += `${item} = ?, `
  })
  Object.values(cardData).forEach(item => {
    SQLData.push(item);
  })

  db.query(SQL, SQLData, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
}

export const deleteCard = (req, res) => {
  const { idcard } = req.params;
  let SQL = "DELETE FROM cards WHERE idcard = ?";
  db.query(SQL, [idcard], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  })
}