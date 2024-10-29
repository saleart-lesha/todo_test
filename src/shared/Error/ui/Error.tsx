import { Flex, Text } from '@mantine/core'
import { IconBug } from '@tabler/icons-react'
import classes from './Error.module.css'

const Error = () => {
  return (
    <Flex direction='column' align='center' justify='center' className={classes.error}>
      <IconBug size={60} stroke={1} />
      <Text fw={700} size='lg'>
        Ошибка загрузки
      </Text>
    </Flex>
  )
}

export default Error
