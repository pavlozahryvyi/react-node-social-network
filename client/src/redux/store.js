import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sitebarReducer";

let store = {
    _state: {

        profilePage: {
            postData: [
                {id:2, message: 'My first react app!', likesCount: 32},
                {id:3, message: 'I need more CSS', likesCount: 15},
                {id:3, message: 'COOOOOOOOOOOOOOL!!!', likesCount: 15},
                {id:4, message: 'React is cool!', likesCount: 45},
            ],
            newPostText: 'Welcome! Have a nice day!',
        },

        dialogsPage: {
            dialogData: [
                {id: 1, name: 'Pavel'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Egor'},
                {id: 4, name: 'Sasha'},
            ],

            messagesData: [
                {id: 1, message: 'Yo!'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'What are you doing?'},
                {id: 4, message: 'Hi!'},
            ],

            newMessageText: 'Add your message',
        },

        siteBar: {}

    },

    _callSubscriber () {
        console.log("State changed");
    },


    getState(){
        return this._state;
    },

    subscribe (observer) {
        this._callSubscriber = observer;
    },

    dispatch(action){

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.siteBar = sidebarReducer(this._state.siteBar, action);

        this._callSubscriber(this._state);
    }
};

window.store = store;

export default store;