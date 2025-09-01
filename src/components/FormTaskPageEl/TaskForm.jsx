import React from 'react'
import { Formik, Form } from 'formik'
import styles from './TaskForm.module.scss'
import VALIDATION_SCHEMA_TASK from '../../utils/validationSchemaTask'
import LabelField from '../FormTaskPageEl/LabelField'

export default function TaskForm({
	initialValues,
	onSubmit,
	submitText,
	onCancel,
}) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={VALIDATION_SCHEMA_TASK}
		>
			<Form className={styles.taskForm}>
				<LabelField label='Task Name' name='name' />
				<LabelField label='Deadline' name='lastDateToRealization' type='date' />

				<div className={styles.formBtns}>
					<button type='submit'>{submitText}</button>
					{onCancel && (
						<button
							type='button'
							className={styles.cancelBtn}
							onClick={onCancel}
						>
							Cancel
						</button>
					)}
				</div>
			</Form>
		</Formik>
	)
}
