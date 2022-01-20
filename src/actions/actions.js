// synchronous action creator


export const ManageFav = (id, oldData) => {
    const data = oldData.data.map(item => {
        return (item.id === id ? {...item, fav:!item.fav}: item)
    })
    
    console.log('===', oldData, data)
     return {
         type: "ManageFav",
         data: {...oldData,data:data}
    }
}



export const SearchTerm = (text, oldData) => {
    const data = oldData.data.map(item => {
        return (item.first_name.toLowerCase().includes(text) ? {...item, visible:true}: {...item, visible:false})
    })
    console.log('===', oldData, data)
     return {
         type: "SearchTerm",
         data: {...oldData,data:data}
    }
}

export const DeleteFav = (id, oldData) => {
    
    const data = oldData.data.map(item => {
        return (item.id === id ? {...item, fav:false}: item)

    })
    
    console.log('===', oldData, data)
     return {
         type: "DeleteFav",
         data: {...oldData,data:data}
    }
}

// asynchronous action creator
export const fetchData = () => {

    return (dispatch) => {
        return fetch('https://reqres.in/api/users?page=${page}&per_page=${countPerPage}&delay=1`')
            .then(response => response.json())
            .then(json => {
                const data = json.data.map(item => {
                    return {...item, visible:true, fav: false}
               
                })
                return  dispatch({ type: "FetchData", data: {json, data:data} })
            })
            .catch(err => dispatch(
                { type: "ERROR",msg: "Unable to fetch data" }))
    }

}