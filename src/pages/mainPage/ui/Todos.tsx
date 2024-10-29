import { Card, Center, Flex, SegmentedControl, Text } from '@mantine/core'
import { useState } from 'react'
import CreateTaskBtn from '../../../features/CreateTaskBtn/ui/CreateTaskBtn'
import Error from '../../../shared/Error/ui/Error'
import Loading from '../../../shared/Loading/ui/Loading'
import { useGetTasksQuery } from '../../../shared/Task/api/TaskApi'
import CardTasks from '../../../widget/CardTasks/CardTasks'
import classes from './Todos.module.css'

function Todos() {
  const [mode, setMode] = useState('active')

  const { data: todos, isLoading, isError } = useGetTasksQuery()

  return (
    <>
      <Center className={classes.main}>
        <Flex
          direction='column'
          justify='center'
          align='center'
          gap='md'
          className={classes.flex_container}
        >
          <Text size='32px' color='blue'>
            Todos
          </Text>
          <SegmentedControl
            value={mode}
            onChange={setMode}
            data={[
              { label: 'Все', value: 'all' },
              { label: 'Задачи', value: 'active' },
              { label: 'Выполненные', value: 'completed' },
            ]}
            color='blue'
          />
          <Card withBorder className={classes.card}>
            {todos && <CardTasks mode={mode} todos={todos} />}
            {isLoading && <Loading />}
            {isError && <Error />}
          </Card>
          {mode !== 'completed' && <CreateTaskBtn />}
        </Flex>
      </Center>
    </>
  )
}

export default Todos
