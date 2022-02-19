import { types } from "../../types/types";

describe('types.js test', () => {
    test('types equals', () => {
        const expectTypes = {
            login: "[Auth] Login",
            logout: "[Auth] Logout",

            uiSetError: "[UI] Set Error",
            uiUnsetError: "[UI] Unset Error",

            loading: "[UI] Loading",
            unloading: "[UI] Unloading",

            notesAddNew: "[Notes] Add New",
            notesActive: "[Notes] Active",
            notesLoad: "[Notes] Load",
            notesUpdated: "[Notes] Updated",
            notesFileUrl: "[Notes] File Url",
            notesDelete: "[Notes] Delete",
            notesLogoutCleaning: '[Notes] Logout Cleaning'
            };

        expect(types).toEqual(expectTypes);
    })
});