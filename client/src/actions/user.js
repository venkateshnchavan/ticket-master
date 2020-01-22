import axios from '../config/axios'
import { startSetCustomers } from './customers'
import { startSetDepartments } from './department'
import { startSetEmployees } from './employee'
import { startSetTickets } from './ticket'
import { setCustomers } from './customers'
import { setDepartments } from './department'
import { setEmployees } from './employee'
import { setTickets } from './ticket'

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const startSetUser = () => {
    return (dispatch) => {
        axios.get('/user/account', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                if(response.data.name === 'JsonWebTokenError'){
                    window.alert('Please login...')
                    localStorage.clear('x-auth')
                    window.location.href = '/user/login'
                } else {
                    const user = response.data
                    dispatch(setUser(user))
                    dispatch(startSetCustomers())
                    dispatch(startSetDepartments())
                    dispatch(startSetEmployees())
                    dispatch(startSetTickets())
                }
            })
            .catch(() => {
                window.alert('Please login...')
                localStorage.clear('x-auth')
                window.location.href = '/user/login'
            })
    }   
}

export const startLoginUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/user/login', formData)
            .then((response) => {
                const { token } = response.data
                if(token){
                    localStorage.setItem('x-auth', token)
                    dispatch(startSetUser())
                    props.history.push('/')
                } else {
                    window.alert(response.data)
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const startRegisterUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/user/register', formData)
            .then((response) => {
                if(response.data.errors) {
                    window.alert(response.data.message)
                } else if(response.data.errmsg) {
                    window.alert(response.data.errmsg)
                } else {
                    window.alert(response.data)
                    dispatch(setUser({}))
                    props.history.push('/user/login')
                }
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}

export const startRemoveUser = () => {
    return (dispatch) => {
        axios.delete('/user/logout', {
            headers: {
                'x-auth': localStorage.getItem('x-auth')
            }
        })
            .then((response) => {
                window.alert(response.data)
                localStorage.clear('x-uath')
                dispatch(setUser({}))
                dispatch(setCustomers([{}]))
                dispatch(setDepartments([{}]))
                dispatch(setEmployees([{}]))
                dispatch(setTickets([{}]))
            })
            .catch((err) => {
                window.alert(err)
            })
    }
}