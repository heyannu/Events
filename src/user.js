const userReducer = (state=false, action) =>{
    switch (action.type){
        case 'LOGGED_IN':
            return !state
        case 'LOGGED_OUT':
            return state
    } 
}
export default userReducer