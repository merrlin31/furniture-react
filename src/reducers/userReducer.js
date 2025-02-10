const SET_USER = 'SET_USER'
const SET_EMPTY_USER = 'SET_EMPTY_USER'
const LOGOUT = 'LOGOUT'
const IS_LOADING = 'IS_LOADING'
const IS_USER_MENU_VISIBLE = 'IS_USER_MENU_VISIBLE'
const SET_USER_FURNITURE_PRICE = 'SET_USER_FURNITURE_PRICE'
const SET_USER_SERVICE_PRICE = 'SET_USER_SERVICE_PRICE'
// const SET_USER_INDENTS = 'SET_USER_INDENTS'

const defaultState = {
   currentUser: {},
   isAuth: false,
   isActivated: false,
   isLoading: false,
   isUserMenuVisible: false,
   // userFurnitures: [],
   // userServices: [],
   // userIndents: []
}

export default function userReducer(state = defaultState, action) {
   switch (action.type) {
      case SET_USER:
         return {...state, 
            currentUser: {...action.payload}, 
            isAuth: true,
            isActivated: action.payload.isActivated,
         }
      case SET_EMPTY_USER:
         return {...state, 
            currentUser: {...action.payload}, 
         }
      case LOGOUT:
         return {
            ...state,
            currentUser: {},
            isAuth: false,
            isActivated: false
         }    
      case IS_LOADING:
         return {...state, isLoading: action.payload}
      case IS_USER_MENU_VISIBLE:
         return {...state, isUserMenuVisible: action.payload}
      case SET_USER_FURNITURE_PRICE:
         return {...state, currentUser: {...state.currentUser, furnitures: state.currentUser.furnitures.map(item => {
            if (item.name === action.payload.name) {
               return {...action.payload}
            }
            return item
            })}
         }
      case SET_USER_SERVICE_PRICE:
         return {...state, currentUser: {...state.currentUser, services: state.currentUser.services.map(item => {
            if (item.name === action.payload.name) {
               return {...action.payload}
            }
            return item
            })}
         }
      // case SET_USER_INDENTS:
      //    return {...state, userIndents: [...action.payload]}
      default:
         return state
      }
   }
   
   export const setUser = (user) => ({type: SET_USER, payload: user})
   export const setEmptyUser = (user) => ({type: SET_EMPTY_USER, payload: user})
   export const deleteUser = () => ({type: LOGOUT})
   export const setIsLoading = (bool) => ({type: IS_LOADING, payload: bool})
   export const setUserMenuVisibility = (bool) => ({type: IS_USER_MENU_VISIBLE, payload: bool})
   export const setUserFurniturePrice = (obj) => ({type: SET_USER_FURNITURE_PRICE, payload: obj})
   export const setUserServicePrice = (obj) => ({type: SET_USER_SERVICE_PRICE, payload: obj})
   // export const setUserIndents = (indents) => ({type: SET_USER_INDENTS, payload: indents})
   