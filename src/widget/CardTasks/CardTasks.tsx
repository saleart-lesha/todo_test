import NoData from '../../shared/NoData/ui/NoData'
import { ITask } from '../../shared/Task/model/ITask'
import Task from '../../shared/Task/ui/Task'

interface CardTasksProps {
  mode: string
  todos: ITask[]
}

const CardTasks = ({ mode, todos }: CardTasksProps) => {
  const reversedTodos = [...todos].reverse()
  return (
    <>
      {mode === 'all' && (
        <>
          {reversedTodos.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          {reversedTodos.length === 0 && <NoData />}
        </>
      )}
      {mode === 'active' && (
        <>
          {reversedTodos.some((task) => !task.completed) ? (
            reversedTodos.map((task) => !task.completed && <Task key={task.id} task={task} />)
          ) : (
            <NoData />
          )}
        </>
      )}
      {mode === 'completed' && (
        <>
          {reversedTodos.some((task) => task.completed) ? (
            reversedTodos.map((task) => task.completed && <Task key={task.id} task={task} />)
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  )
}

export default CardTasks
