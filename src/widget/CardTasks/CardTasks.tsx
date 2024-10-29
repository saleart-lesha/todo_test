import { ITask } from '../../shared/Task/model/ITask'
import Task from '../../shared/Task/ui/Task'

interface CardTasksProps {
  mode: string
  todos: ITask[]
}

const CardTasks = ({ mode, todos }: CardTasksProps) => {
  return (
    <>
      {mode === 'all' && (
        <>
          {todos.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </>
      )}
      {mode === 'active' && (
        <>{todos.map((task) => !task.completed && <Task key={task.id} task={task} />)}</>
      )}
      {mode === 'completed' && (
        <>{todos.map((task) => task.completed && <Task key={task.id} task={task} />)}</>
      )}
    </>
  )
}

export default CardTasks
