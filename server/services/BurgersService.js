import { BadRequest } from '../utils/Errors'

const FakeDB = {
  burgers: [
    {
      name: 'HeartStopper1',
      id: '0'
    },
    {
      name: 'HeartStopper2',
      id: '1'
    },
    {
      name: 'HeartStopper3',
      id: '2'
    }
  ]
}

class BurgersService {

  async createBurger(burgerData) {
    burgerData.id = FakeDB.burgers.length.toString()
    await FakeDB.burgers.push(burgerData)
    return burgerData
  }

  async getAllBurgers() {
    const burgers = await FakeDB.burgers
    return burgers
  }

  async editBurger(id, updatedBurger) {
    const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)
    if (burgerIndex === -1) {
      throw new BadRequest('no burger by that id')
    }
    FakeDB.burgers.splice(burgerIndex, 1, updatedBurger)
    return updatedBurger
  }
  async deleteBurger(id) {
    const burgerIndex = await FakeDB.burgers.findIndex(b => b.id === id)

    if (burgerIndex === -1) {

      throw new BadRequest('no burger by that id to delete')
    }
    FakeDB.burgers.splice(burgerIndex, 1)

    return 'Deleted'
  }
}

export const burgersService = new BurgersService()