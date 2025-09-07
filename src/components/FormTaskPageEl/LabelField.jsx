import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from './LabelField.module.scss'

export default function LabelField({ label, name, type = 'text' }) {
    return (
        <div className={styles.fieldContainer}>
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} type={type} />
            <ErrorMessage
                name={name}
                component="div"
                className={styles.error}
            />
        </div>
    )
}
