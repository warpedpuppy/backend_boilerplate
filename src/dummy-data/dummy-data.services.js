const Users = require('../models/user-model');
const Resources = require('../models/resource-model');
const faker = require('faker');
const usersRouter = require('../users/users.routes');

const DummyDataService = {
    insertUsers: async function () {
        let usersArr = []
        for(let i = 0; i < 100; i ++){
            let name = faker.name.findName();
            usersArr.push({
                username: name,
                password: name,
                email:faker.internet.email(),
                dummy: true
            })
        }
        return await Users.create(usersArr);


    },
    insertResources: async function () {
        let users = Users.find();
        let ids = users.map( user => user._id)

        let resourceArray = []
        let category = 
        for (let i = 0; i < 100; i ++) {
            resourceArray.push({
                name: faker.lorem.word(),
                category: ['doctor', 'contractor', 'other'],
                description: {type: String, required: true},
                user: ids[i]
            })
        }
        return await Resources.create(resourceArray);

    },
    deleteData: async function () {
        return await Users.deleteMany({dummy: true})
    }

}

module.exports = DummyDataService;