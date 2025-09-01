import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TaskPage.module.scss'
import TaskList from '../../components/TaskPageEl/TaskList'
import {
	addTask,
	complatedTask,
	editTask,
	removeTask,
} from '../../store/slices/taskSlice'
import CreateFormTaskPage from '../CreateFormTaskPage'

function TaskPage({
	tasks,
	addTaskToList,
	removeTaskToList,
	editTaskToList,
	takeComplatedTask,
}) {
	const [isOpeningPageAddTask, setIsOpeningPageAddTask] = useState(false)
	const [filterType, setFilterType] = useState('all')

	const handlerOpeningPageAddPage = () => {
		setIsOpeningPageAddTask(!isOpeningPageAddTask)
	}

	const filteredElements = (filterType) => {
		switch (filterType) {
			case 'completed':
				return tasks.filter((task) => task.completed === true) // тільки виконані
			case 'name':
				return [...tasks].sort((a, b) => a.name.localeCompare(b.name))
			case 'date':
				return [...tasks].sort(
					(a, b) =>
						new Date(a.lastDateToRealization) -
						new Date(b.lastDateToRealization)
				)
			default:
				return tasks
		}
	}

	return (
		<div className={styles.containerTaskPage}>
			<div className={styles.taskPageHeader}>
				<img
					className={styles.taskPageHeaderImg}
					src='/images/todo-background.jpg'
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
			{isOpeningPageAddTask ? (
				<CreateFormTaskPage
					onAdd={addTaskToList}
					onClose={handlerOpeningPageAddPage}
				/>
			) : null}
			<div className={styles.taskPageTaskList}>
				<div className={styles.taskPageTaskFilterContainer}>
					<span className={styles.taskPageTaskFilterTitle}>Filter by:</span>
					<button
						className={styles.taskPageTaskFilterBtn}
						onClick={() => setFilterType('all')}
					>
						All
					</button>
					<button
						className={styles.taskPageTaskFilterBtn}
						onClick={() => setFilterType('name')}
					>
						Name
					</button>
					<button
						className={styles.taskPageTaskFilterBtn}
						onClick={() => setFilterType('Date')}
					>
						Date
					</button>
					<button
						className={styles.taskPageTaskFilterBtn}
						onClick={() => setFilterType('completed')}
					>
						Completed
					</button>
				</div>
				<TaskList
					data={filteredElements(filterType)}
					onEdit={editTaskToList}
					onDelete={removeTaskToList}
					onComplated={takeComplatedTask}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return state.taskInfo
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTaskToList: (value) => dispatch(addTask(value)),
		removeTaskToList: (value) => dispatch(removeTask(value)),
		editTaskToList: (value) => dispatch(editTask(value)),
		takeComplatedTask: (id) => dispatch(complatedTask(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage)
