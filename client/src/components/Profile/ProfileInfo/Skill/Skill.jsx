import React from "react";
import styles from "./Skill.module.css"

export const Skill = ({skill}) => {
    return <span className={styles.skill}>{skill}</span>
}