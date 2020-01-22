const departmentsInitialState = []

const departmentReducer = (state = departmentsInitialState, action) => {
    switch(action.type){
        case 'SET_DEPARTMENTS': {
            return action.payload
        }
        case 'ADD_DEPARTMENT': {
            return [...state, action.payload]
        }
        case 'EDIT_DEPARTMENT': {
            return state.map(department => {
                if(department._id === action.payload._id){
                    return action.payload
                } else {
                    return department
                }
            })
        }
        case 'REMOVE_DEPARTMENT': {
            return state.filter(department => department._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}

export default departmentReducer