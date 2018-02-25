import { v4 as uuid } from 'uuid'

/**
 * Returns a new budget structure to intialize a budget
 * @return {object} [A base budget object]
 */
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
