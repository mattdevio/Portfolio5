import { v4 as uuid } from 'uuid'

export default () => {

  const struct = {
    income: {},
  }
  const income = {
    label: '',
    planned: '$0.00',
    recieved: '$0.00',
  }

  struct.income[uuid()] = Object.assign({}, income)
  struct.income[uuid()] = Object.assign({}, income)

  return struct
}
