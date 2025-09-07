import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './TaskListItem.module.scss'
import AiOutlineDelete from '../../img/AiOutlineDelete'
import BiEdit from '../../img/BiEdit'
import TaskForm from '../FormTaskPageEl/TaskForm'

export default function TaskListItem({ item, onEdit, onDelete, onComplated }) {
    const { name, lastDateToRealization, id, completed } = item
    const [isEditing, setIsEditing] = useState(false)

    const submitHandler = (values) => {
        onEdit({ id, ...values })
        setIsEditing(false)
    }

    const titleStyles = classNames(styles.taskName, {
        [styles.completed]: completed,
    })

    return (
        <li className={styles.taskListItemContainer}>
            <div className={styles.taskMainInfo}>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onComplated(id)}
                    className={styles.taskCheckbox}
                />
                <h3 className={titleStyles}>{name}</h3>
                <p className={styles.taskDate}>{lastDateToRealization}</p>
            </div>
            <div className={styles.taskBtnsNav}>
                <button
                    className={styles.taskBtnDelete}
                    onClick={() => onDelete(id)}
                >
                    <AiOutlineDelete />
                </button>
                <button
                    className={styles.taskBtnEdit}
                    onClick={() => setIsEditing(true)}
                >
                    <BiEdit />
                </button>
            </div>

            {isEditing && (
                <div className={styles.editFormTaskPageBackdrop}>
                    <div className={styles.editFormTaskPageContainer}>
                        <h2 className={styles.editFormTaskPageTitle}>
                            Edit Task
                        </h2>
                        <TaskForm
                            initialValues={{
                                name,
                                lastDateToRealization,
                                completed,
                            }}
                            onSubmit={submitHandler}
                            submitText="Save"
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                </div>
            )}
        </li>
    )
}
