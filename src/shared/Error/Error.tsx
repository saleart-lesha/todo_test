import { Center, Flex, Text } from '@mantine/core'
import { IconBug } from '@tabler/icons-react'

const Error = () => {
  return (
    <Center>
      <Flex direction='column' align='center'>
        <IconBug size={60} stroke={1} />
        <Text fw={700} size='lg'>
          Ошибка загрузки
        </Text>
      </Flex>
    </Center>
  )
}

export default Error
