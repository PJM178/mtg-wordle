const cardDataRouter = require('express').Router()
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');
// const allCardData = require('../card_data/default-cards-20221023090511.json')
const allCardData = require('../card_data/uusi.json')
const allSets = require('../card_data/allSets.json')

cardDataRouter.get('/', async (request, response) => {
  // get only expansion or core sets
  const filteredAllSets = allSets.filter(set => set.set_type === 'expansion' || set.set_type === 'core')
  // remove just announced sets
  filteredAllSets.splice(0, 3)
  const allCards = []
  // get cards belongin to chosen sets
  for (let i = 0; i < filteredAllSets.length; i++) {
    let cardData = allCardData.filter(card => card.set_id === filteredAllSets[i].id && card.booster !== false)
    cardData.forEach(card => allCards.push(card))
  }
  // remove the reprints
  const allUniqueCardNames = [...new Set(allCards.map(card => card.name))]
  // https://yagisanatode.com/2021/07/03/get-a-unique-list-of-objects-in-an-array-of-object-in-javascript/
  // const uniqueCards = [
  //   ...new Map(allCards.map(card => [card['name'], card])).values()
  // ]

  const allCardsAndSets = {
    allSets: filteredAllSets,
    allCards: allCards,
    allUniqueCardNames: allUniqueCardNames
  }

  response.json(allCardsAndSets)
})

module.exports = cardDataRouter
