import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TaskPage.module.scss'
import TaskList from '../../components/TaskPageEl/TaskList'
import {
    addTask,
    complatedTask,
    editTask,
    removeTask,
    setFilter,
    setOrderBy,
} from '../../store/slices/taskSlice'

import Header from '../../components/Header'
import CreateFormTaskPage from '../../components/CreateFormTaskPage'

// ✅ Селектор, який застосовує і фільтр, і сортування
const selectVisibleTasks = (tasks, filter, orderBy) => {
    let result = tasks

    if (filter === 'completed') {
        result = result.filter((task) => task.completed)
    }

    if (orderBy === 'name') {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (orderBy === 'date') {
        result = [...result].sort(
            (a, b) =>
                new Date(a.lastDateToRealization) -
                new Date(b.lastDateToRealization)
        )
    }

    return result
}

function TaskPage({
    tasks,
    filter,
    orderBy,
    addTaskToList,
    removeTaskToList,
    editTaskToList,
    takeComplatedTask,
    changeFilter,
    changeOrderBy,
}) {
    const [isOpeningPageAddTask, setIsOpeningPageAddTask] = useState(false)

    const handlerOpeningPageAddPage = () => {
        setIsOpeningPageAddTask((prev) => !prev)
    }

    const visibleTasks = selectVisibleTasks(tasks, filter, orderBy)

    return (
        <div className={styles.containerTaskPage}>
            <Header />

            <div className={styles.taskPageHeader}>
                <img
                    className={styles.taskPageHeaderImg}
                    src="/images/todo-background.jpg"
                    alt="todo-background"
                />
                <button
                    onClick={handlerOpeningPageAddPage}
                    className={styles.taskPageHeaderBtnCreate}
                >
                    <h2 className={styles.taskPageHeaderBtnCreateTitle}>
                        Create a new todo...
                    </h2>
                </button>
            </div>

            {isOpeningPageAddTask && (
                <CreateFormTaskPage
                    onAdd={addTaskToList}
                    onClose={handlerOpeningPageAddPage}
                />
            )}

            <div className={styles.taskPageTaskList}>
                <div className={styles.taskPageTaskFilterContainer}>
                    <span className={styles.taskPageTaskFilterTitle}>
                        Filter:
                    </span>
                    <button
                        className={styles.taskPageTaskFilterBtn}
                        onClick={() => changeFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={styles.taskPageTaskFilterBtn}
                        onClick={() => changeFilter('completed')}
                    >
                        Completed
                    </button>

                    <span className={styles.taskPageTaskFilterTitle}>
                        Sort by:
                    </span>
                    <button
                        className={styles.taskPageTaskFilterBtn}
                        onClick={() => changeOrderBy('name')}
                    >
                        Name
                    </button>
                    <button
                        className={styles.taskPageTaskFilterBtn}
                        onClick={() => changeOrderBy('date')}
                    >
                        Date
                    </button>
                </div>

                <TaskList
                    data={visibleTasks}
                    onEdit={editTaskToList}
                    onDelete={removeTaskToList}
                    onComplated={takeComplatedTask}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.taskInfo.tasks,
    filter: state.taskInfo.filter,
    orderBy: state.taskInfo.orderBy,
})

const mapDispatchToProps = (dispatch) => ({
    addTaskToList: (value) => dispatch(addTask(value)),
    removeTaskToList: (value) => dispatch(removeTask(value)),
    editTaskToList: (value) => dispatch(editTask(value)),
    takeComplatedTask: (id) => dispatch(complatedTask(id)),
    changeFilter: (filter) => dispatch(setFilter(filter)),
    changeOrderBy: (order) => dispatch(setOrderBy(order)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage)
