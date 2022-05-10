export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    return config
  })
  $axios.onResponse((response)=> {
    return response.data
  })
}