import React from 'react'
import TaskListItem from './TaskListItem'
import styles from './TaskList.module.scss'

export default function TaskList({ data, onEdit, onDelete, onComplated }) {
	return (
		<ul className={styles.taskListContainer}>
			{data.map((item) => (
				<TaskListItem
					key={item.id}
					item={item}
					onEdit={onEdit}
					onDelete={onDelete}
					onComplated={onComplated}
				/>
			))}
		</ul>
	)
}
