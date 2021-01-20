const Users = require('../models/user-model');
const Resources = require('../models/resource-model');
const Memoirs = require('../models/memoir-model');
const faker = require('faker');
const usersRouter = require('../users/users.routes');
const Config = require('../config');

const DummyDataService = {
    dummyQ: 100,
    userIDS: undefined,
    insertUsers: async function () {
        let usersArr = []
        for(let i = 0; i < this.dummyQ; i ++){
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
    deleteData: async function () {
        let deleteResources = await Resources.deleteMany({dummy: true});
        let deleteUsers = await Users.deleteMany({dummy: true});
        let deleteMemoirs = await Memoirs.deleteMany({dummy: true});
        return { deleteResources, deleteUsers, deleteMemoirs };
    },
    insertResources: async function () {
        let users = Users.find();
        this.userIDS = users.map( user => user._id )

        let resourceArray = []
        
        for (let i = 0; i < this.dummyQ; i ++) {
            let category = Config.RESOURCE_CATEGORIES[Math.floor(Math.random()*Config.RESOURCE_CATEGORIES.length - 1)]
            resourceArray.push({
                name: faker.lorem.word(),
                category,
                description: faker.lorem.sentence(),
                user: this.userIDS[i],
                dummy: true
            })
        }
        return await Resources.create(resourceArray);

    },
    insertMemoirs: async function () {
        let memoirArray = []
        for (let i = 0; i < this.dummyQ; i ++) {
            memoirArray.push({
                title: faker.lorem.sentence(),
                subtitle: faker.lorem.sentences(),
                text: faker.lorem.paragraphs(),
                user: this.userIDS[i],
                dummy: true
            })
        }
        return await Memoirs.create(memoirArray);

    },


}

module.exports = DummyDataService;