import axios from 'axios'
const baseUrl = '/api/cards'

const getCardData = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getCardData }