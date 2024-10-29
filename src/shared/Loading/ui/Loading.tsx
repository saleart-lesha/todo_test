import { Flex, Loader } from '@mantine/core'
import classes from './Loading.module.css'

const Loading = () => {
  return (
    <Flex justify='center' align='center' className={classes.loading}>
      <Loader color='blue' />
    </Flex>
  )
}

export default Loading
