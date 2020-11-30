import {
  getEmployees
} from '@/api/employee.js'
const employee = {
  state: {
    employees: []
  },
  mutations: {
    SetEmployees: (state, data) => {
      state.employees = data
    },
    AddEmployee: (state, data) => {
      state.employees.unshift(data)
    },
    RemoveEmployee: (state, id) => {
      state.employees = state.employees.filter(item => {
        return item.id !== id
      })
    },
    UpdateEmployee: (state, data) => {
      for (const index in state.employees) {
        if (state.employees[index].id === data.id) {
          state.employees.splice(Number(index), 1, { ...state.employees[index], ...data })
          break
        }
      }
    }
  },
  actions: {
    GetEmployees({
      commit,
      state
    }, params) {
      return new Promise((resolve, reject) => {
        getEmployees(params).then(response => {
          commit('SetEmployees', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default employee
