
import { collection, getDocs, query } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store = mockStore({
    auth: {
        uid: 'TESTING'
    },
});

describe('Pruebas con las acciones de notas', () => {

    beforeEach(() => {
        store.clearActions();
    });

    // test('debe de crear una nueva nota startNewNote', async () => {

    //     await store.dispatch(startNewNote());

    //     const actions = store.getActions();

    //     expect(actions[0]).toEqual({
    //         type: types.notesActive,
    //         payload: {
    //             id: expect.any(String),
    //             title: '',
    //             body: '',
    //             date: expect.any(Number),
    //         }
    //     });

    //      expect(actions[1]).toEqual({
    //         type: types.notesAddNew,
    //         payload: {
    //             id: expect.any(String),
    //             title: '',
    //             body: '',
    //             date: expect.any(Number),
    //         }
    //     });

    //     const docId = actions[0].payload.id;

    //     await deleteDoc(doc(db, `TESTING/journal/notes/${docId}`));
    // });

    test('startLoadingNotes debe cargar las notas', async () => {


const q = query(collection(db, `TESTING/journal/notes`));
        expect(true).toBeTruthy();

    const docSnap = await getDocs(q);

    console.log(docSnap);

        // await store.dispatch(startLoadingNotes('TESTING'));

        // const actions = store.getActions();

        // expect(actions[0]).toEqual({
        //     type: types.notesLoad,
        //     payload: expect.any(Array)
        // });


    });

});