import { loadingAction, setErrorAction, unloadingAction, unsetErrorAction } from "../../actions/uiActions";
import { types } from "../../types/types";


describe('Pruebas en UI Actions', () => {

    test('todas las acciones deben funcionar', () => {
        let action = setErrorAction('HELP');

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'HELP',
        });

        action = unsetErrorAction();

        expect(action).toEqual({
            type: types.uiUnsetError,
        });

        action = loadingAction();

        expect(action).toEqual({
            type: types.loading
        });

        action = unloadingAction();

        expect(action).toEqual({
            type: types.unloading
        });

    });

});