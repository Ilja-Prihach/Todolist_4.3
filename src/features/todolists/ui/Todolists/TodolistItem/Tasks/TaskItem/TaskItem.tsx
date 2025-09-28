import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan"
import { TaskStatus } from "@/common/enums"
import { useAppDispatch } from "@/common/hooks"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types"
import { deleteTaskTC, updateTaskTC } from "@/features/todolists/model/tasks-slice"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import type { ChangeEvent } from "react"
import { useState } from "react"
import { getListItemSx } from "./TaskItem.styles"

type Props = {
  task: DomainTask
  todolistId: string
  disabled: boolean
}

export const TaskItem = ({ task, todolistId, disabled }: Props) => {
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteTask = () => {
    setIsDeleting(true)
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
      .catch(() => {
        setIsDeleting(false)
      })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    if (isDeleting) return
    const newStatusValue = e.currentTarget.checked
    dispatch(
      updateTaskTC({
        todolistId,
        taskId: task.id,
        domainModel: { status: newStatusValue ? TaskStatus.Completed : TaskStatus.New },
      }),
    )
  }

  const changeTaskTitle = (title: string) => {
    if (isDeleting) return
    dispatch(updateTaskTC({ todolistId, taskId: task.id, domainModel: { title } }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const isDisabled = disabled || isDeleting

  return (
    <ListItem sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox disabled={isDisabled} checked={isTaskCompleted} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={isDisabled} />
      </div>
      <IconButton disabled={isDisabled} onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
