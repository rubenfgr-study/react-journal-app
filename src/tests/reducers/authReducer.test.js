import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('pruebas en authReducer', () => {

    const initialState = {};

    test('debe retornar el estado con los datos de enviados en el login', () => {
        const loginAction = {
            type: types.login,
            payload: {
                uid: 'asdf',
                displayName: 'test',
            }
        }
        const result = authReducer(initialState, loginAction);
        expect(result).toEqual({
            uid: 'asdf',
            name: 'test',
        });
    });

    test('debe retornar el estado vacío después de realizar el logout', () => {
        const result = authReducer(initialState, {
            type: types.logout,
        });
        expect(initialState).toEqual(result);
    });
    test('debe retornar el estado inicial', () => {
        const result = authReducer(initialState, {});
        expect(initialState).toEqual(result);
    });

});