import axios from 'axios'
// const baseUrl = '/api/sets'

const getSetImages = async (content) => {
  // console.log(content)
  const response = await axios.post('http://localhost:3001/api/sets', content)
  console.log(response.data)
  return response.data
}

export default { getSetImages }