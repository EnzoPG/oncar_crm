import { userService } from '../_services/';
import { history } from '../_helpers';

function login(email, password) {
    return dispatch => {
        let apiEndpoint = 'admin/auth';
        userService.post(apiEndpoint, {
            email,
            password
        }).then((response) => {
            
            const { data, status } = response;
                
            if (!data || (!status === 200)) {
                dispatch(loginError());
            }

            localStorage.setItem('token', data.result.token);
            localStorage.setItem('_id', data.result.admin._id);
            dispatch(setUserDetails(data));
            history.push('/home');

        }).catch((err) => {
            console.log('err: ', err);
            dispatch(loginError());
        });
    };
}

function getUserScore(idUser) {
    return dispatch => {
        let apiEndpoint = 'lead/get-score/' + idUser;
        userService.get(apiEndpoint).then((response) => {
            
            const { data, status } = response;
            const { result } = data;
                
            if (!result || (!status === 200)) {
                dispatch(getScoreError());
            }

            dispatch(getScoreSuccess(result));

        }).catch((err) => {
            console.log('err: ', err);
            dispatch(getScoreError());
        });
    };
}

function generateNewScore(idUser) {
    return dispatch => {
        let apiEndpoint = 'lead/generate-score';
        userService.post(apiEndpoint, {
            idUser
        }).then((response) => {
            
            const { data, status } = response;
            const { result } = data;
                
            if (!result || (!status === 200)) {
                dispatch(generateNewScoreError());
            }

            dispatch(generateNewScoreSuccess(result));

        }).catch((err) => {
            console.log('err: ', err);
            dispatch(generateNewScoreError());
        });
    };
}

function logout() {
    return dispatch => {
        localStorage.removeItem('_id');
        localStorage.removeItem('token');
        dispatch(logoutUser());
        history.push('/');
    }
}

export function setUserDetails(user) {
    return {
        type: "LOGIN_SUCCESS",
        _id: user._id,
        token: user.token,
        loggingIn: true
    }
}

export function logoutUser() {
    return {
        type: "LOGOUT_SUCCESS",
        _id: null,
        token: null,
        loggingIn: null
    }
}

export function loginError() {
    return {
        type: "LOGIN_FAIL",
        _id: null,
        token: null,
        loggingIn: false,
    }
}

export function getScoreSuccess(user) {
    return {
        type: "SCORE_GET",
        success: true,
        score: user.score,
        message: 'Sucesso ao consultar seu SCORE!',
    }
}

export function getScoreError() {
    return {
        type: "SCORE_GET_ERROR",
        error: true,
        message: 'Houve um problema consultar seu SCORE! Tente novamente mais tarde.',
    }
}

export function generateNewScoreError() {
    return {
        type: "SCORE_GENERATE_ERROR",
        score: 0,
        error: true,
        message: 'Houve um problema ao gerar seu SCORE! Tente novamente mais tarde.',
    }
}

export function generateNewScoreSuccess(user) {
    return {
        type: "SCORE_GENERATE_SUCCESS",
        success: true,
        score: user.score,
        message: 'Seu SCORE foi atualizado com sucesso!',
    }
}

export const userActions = {
    login,
    logout,
    getUserScore,
    generateNewScore,
};