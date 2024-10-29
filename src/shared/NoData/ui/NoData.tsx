import { Flex, Text } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons-react'
import classes from './NoData.module.css'

const NoData = () => {
  return (
    <Flex direction='column' align='center' justify='center' className={classes.no_data}>
      <IconDatabaseOff size={60} stroke={1} />
      <Text fw={700} size='lg'>
        У вас нет задач
      </Text>
    </Flex>
  )
}

export default NoData
