import { flightModel } from "../../models/flightModel"
import { OrderModel } from "../../models/orderModel"
import { UserModel } from "../../models/userModel"
const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static getUsers(): UserModel[] {
        const baseUser: UserModel = { 
            email: 'user@example.com',
            password: 'user123',
            destination: 'Zagreb',
            firstName: 'Example',
            lastName: 'User',
            phone: '0653093261',
            address: 'Danijelova 32',
            orders: []
        }

        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }

        return JSON.parse(localStorage.getItem(USERS)!)
    }

    static login(email: string, password: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        }

        return false
    }
    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u
            }
        }

        return null
    }
    
    static logout() {
        localStorage.removeItem(ACTIVE)
    }

     static updateActiveUser(newUserData: UserModel) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.firstName = newUserData.firstName
                u.lastName = newUserData.lastName
                u.address = newUserData.address
                u.phone = newUserData.phone
                u.destination = newUserData.destination
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static updatePassword(newPassword: string){
         const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.password = newPassword
            }
        }
    }

      static createOrder(order: Partial<OrderModel>, flight: flightModel) {
        order.state = 'w'
        order.flightId = flight.id
        order.flightNumber = flight.flightNumber
        order.destination = flight.destination
        order.scheduledAt = flight.scheduledAt
        order.createdAt = new Date().toISOString()

        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.orders.push(order as OrderModel)
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

     static getOrdersByState(state: 'w' | 'p' | 'c') {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u.orders.filter((o) => o.state === state)
            }
        }

        return []
    }

    static cancelOrder(createdAt: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state == 'w' && o.createdAt == createdAt) {
                        o.state = 'c'
                    }
                }
            }
        }

        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static payOrders() {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                for (let o of u.orders) {
                    if (o.state == 'w') {
                        o.state = 'p'
                    }
                }
            }
        }
        
        localStorage.setItem(USERS, JSON.stringify(users))
    }


}