import React from "react";
import styles from "./FormsControls.module.css"

export const Textarea = ({
                             input,
                             label,
                             meta: {touched, error },
                             ...props
                         }) => {
    const hasError = (touched && error);
    return (
        <div className={styles.formControl}>
            <div className={hasError ? styles.error : ""}>
                <textarea {...input} placeholder={label} {...props}/>
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Input = ({
                             input,
                             label,
                             meta: {touched, error },
                             ...props
                         }) => {
    const hasError = (touched && error);
    return (
        <div className={styles.formControl}>
            <div className={hasError ? styles.error : ""}>
                <input {...input} placeholder={label} {...props}/>
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};