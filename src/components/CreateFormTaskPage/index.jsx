import React from 'react'
import styles from './CreateFormTaskPage.module.scss'
import INITIAL_VALUES_FORM_TASK from '../../constans/initialValuesFormTask'
import TaskForm from '../FormTaskPageEl/TaskForm'

export default function CreateFormTaskPage({ onAdd, onClose }) {
    const submitHandler = (values, { resetForm }) => {
        onAdd(values)
        resetForm()
        onClose()
    }

    return (
        <div className={styles.createFormTaskPageContainer}>
            <h1 className={styles.createFormTaskPageTitle}>
                Create a new todo task
            </h1>
            <TaskForm
                initialValues={INITIAL_VALUES_FORM_TASK}
                onSubmit={submitHandler}
                submitText="Add Task"
                onCancel={onClose}
            />
        </div>
    )
}
