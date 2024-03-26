import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',
    searching: false, 
    searched: false,

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins()
    },

    searchCoins: debounce( async () => {
        set({searching: true})
        const {query, trending} = homeStore.getState()

        if(query.length > 2){
            const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
            const coins = res.data.coins.map(coin => {
                return {
                    name: coin.name,
                    image: coin.large,
                    id: coin.id
                }
            })

            set({coins, searching: false, searched: true})
        } else {
            set({coins: trending, searching: false, searched: false});
        }

    }, 500),

    fetchCoins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
        
        const coins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                price: coin.item.data.price,
            }
        })

        set({ coins, trending: coins })

    }
}))

export default homeStore