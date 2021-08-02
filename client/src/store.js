import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    provinsiCreateReducer,
    provinsiDeleteReducer,
    provinsiDetailsReducer,
    provinsiListReducer,
    provinsiUpdateReducer
} from './reducers/provinsiReducers';
import {
    kotaCreateReducer,
    kotaDeleteReducer,
    kotaDetailsReducer,
    kotaListReducer,
    kotaReducer,
    kotaUpdateReducer
} from './reducers/kotaReducers';
import {
    kecamatanCreateReducer,
    kecamatanDeleteReducer,
    kecamatanDetailsReducer,
    kecamatanListReducer,
    kecamatanUpdateReducer,
} from './reducers/kecamatanReducers';
import {
    kelurahanAllReducer,
    kelurahanCreateReducer,
    kelurahanDeleteReducer,
    kelurahanDetailsReducer,
    kelurahanListReducer,
    kelurahanUpdateReducer,
} from './reducers/kelurahanReducers';
import {
    kodeposCreateReducer,
    kodeposDeleteReducer,
    kodeposDetailsReducer,
    kodeposListReducer,
    kodeposUpdateReducer,
} from './reducers/kodeposReducers';
import {
    wilayahCreateReducer,
    wilayahDeleteReducer,
    wilayahDetailsReducer,
    wilayahListReducer,
    wilayahUpdateReducer,
} from './reducers/wilayahReducers';
import {
    cabangCreateReducer,
    cabangDeleteReducer,
    cabangDetailsReducer,
    cabangListReducer,
    cabangUpdateReducer,
} from './reducers/cabangReducers';
import {
    outletCreateReducer,
    outletDeleteReducer,
    outletDetailsReducer,
    outletListReducer,
    outletUpdateReducer,
} from './reducers/outletReducers';
import {
    userCreateReducer,
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userProfileReducer,
    userUpdateReducer
} from './reducers/authReducers';

const reducer = combineReducers({
    provinsiList: provinsiListReducer,
    provinsiDetail: provinsiDetailsReducer,
    provinsiCreate: provinsiCreateReducer,
    provinsiUpdate: provinsiUpdateReducer,
    provinsiDelete: provinsiDeleteReducer,
    kotaList: kotaListReducer,
    kotaAll: kotaReducer,
    kotaDetail: kotaDetailsReducer,
    kotaCreate: kotaCreateReducer,
    kotaUpdate: kotaUpdateReducer,
    kotaDelete: kotaDeleteReducer,
    kecamatanList: kecamatanListReducer,
    kecamatanDetail: kecamatanDetailsReducer,
    kecamatanCreate: kecamatanCreateReducer,
    kecamatanUpdate: kecamatanUpdateReducer,
    kecamatanDelete: kecamatanDeleteReducer,
    kelurahanList: kelurahanListReducer,
    kelurahanAll: kelurahanAllReducer,
    kelurahanDetail: kelurahanDetailsReducer,
    kelurahanCreate: kelurahanCreateReducer,
    kelurahanUpdate: kelurahanUpdateReducer,
    kelurahanDelete: kelurahanDeleteReducer,
    kodeposList: kodeposListReducer,
    kodeposDetail: kodeposDetailsReducer,
    kodeposCreate: kodeposCreateReducer,
    kodeposUpdate: kodeposUpdateReducer,
    kodeposDelete: kodeposDeleteReducer,
    wilayahList: wilayahListReducer,
    wilayahDetail: wilayahDetailsReducer,
    wilayahCreate: wilayahCreateReducer,
    wilayahUpdate: wilayahUpdateReducer,
    wilayahDelete: wilayahDeleteReducer,
    cabangList: cabangListReducer,
    cabangDetail: cabangDetailsReducer,
    cabangCreate: cabangCreateReducer,
    cabangUpdate: cabangUpdateReducer,
    cabangDelete: cabangDeleteReducer,
    outletList: outletListReducer,
    outletDetail: outletDetailsReducer,
    outletCreate: outletCreateReducer,
    outletUpdate: outletUpdateReducer,
    outletDelete: outletDeleteReducer,
    userLogin: userLoginReducer,
    userCreate: userCreateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userDetails: userDetailsReducer,
    userProfile: userProfileReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store