import { Card, Center, Flex, SegmentedControl, Text } from '@mantine/core'
import { useState } from 'react'
import Error from '../../shared/Error/Error'
import Loading from '../../shared/Loading/Loading'
import { useGetTasksQuery } from '../../shared/Task/api/TaskApi'
import CardTasks from '../../widget/CardTasks/CardTasks'

function Todos() {
  const [mode, setMode] = useState('active')

  const { data: todos, isLoading, isError } = useGetTasksQuery()

  return (
    <>
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Flex direction='column' justify='center' align='center' gap='md'>
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
          <Card withBorder style={{ minWidth: '350px', minHeight: '500px' }}>
            {todos && <CardTasks mode={mode} todos={todos} />}
            {isLoading && <Loading />}
            {isError && <Error />}
          </Card>
        </Flex>
      </Center>
    </>
  )
}

export default Todos
