const ADD_MESSAGE = 'dialogsReducer/ADD-MESSAGE';

let initialState = {
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
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case(ADD_MESSAGE):

            let newMessage = {
                id: 5,
                message: action.newMessageText,
            };

            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageText: ''
            };

        default:
            return state;
    }
};

export const addMessage = (newMessageText) => ({type: ADD_MESSAGE, newMessageText});


export default dialogsReducer;