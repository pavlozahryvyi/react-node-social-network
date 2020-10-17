import React from "react";
import styles from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {Redirect} from "react-router-dom";
import NewMessage from "./NewMessage/NewMessageForm";

const Dialogs = ({
                     dialogsPage,
                     isAuth,
                     addMessage,
                     updateNewMessageText
                 }) => {

    const {dialogData, messagesData} = dialogsPage;

    //array of components
    const dialogsElements = dialogData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>);

    const messagesElements = messagesData.map(messageItem => <Message key={messageItem.id}
                                                                      message={messageItem.message}/>);

    return isAuth ? (
        <div className={styles.dialogs}>
            <div className={styles.dialogsBlock}>

                {dialogsElements}

            </div>
            <div className={styles.messagesBlock}>

                {messagesElements}

                <NewMessage addMessage={addMessage}
                            updateNewMessageText={updateNewMessageText}
                            state={dialogsPage}/>
            </div>
        </div>
    ) : (
        <Redirect to={'/login'}/>
    )
};

export default Dialogs;