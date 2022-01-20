const intialState = {
    num: 0,
    data: null,
    error: ""
}

const reducer = (state = intialState, action) => {
console.log("----***", action)
    switch (action.type) {       
        
        case "FetchData":
            return { ...state, data: action.data }
        case "ManageFav":
            return { ...state, data: action.data }
        case "SearchTerm":
            return { ...state, data: action.data }
        case "DeleteFav":
            return { ...state, data: action.data }
        case "ERROR":
            return { ...state, error: action.msg }
        
        default:
            return state
    }

}


export default reducer
