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
                password: "testing",
                email:faker.internet.email(),
                personalStatement: faker.lorem.paragraphs(),
                imageRef: faker.image.avatar(),
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
        let users = await Users.find();
        this.userIDS = users.map( user => user._id )

        let resourceArray = []
        
        for (let i = 0; i < this.dummyQ; i ++) {
            let categories = Config.RESOURCE_CATEGORIES;
            let index = Math.floor(Math.random() * categories.length)
            let category = categories[index]
            resourceArray.push({
                name: faker.lorem.word(),
                category,
                description: faker.lorem.paragraph(),
                webSite: 'http://google.com',
                email: "asdf@asdf.com", 
                phone: "123.234.5678",
                user: this.userIDS[i],
                dummy: true
            })
            
        }
        let result = await Resources.create(resourceArray);
        result.forEach( resource => {
            Users.updateOne({_id: resource.user}, {$push: { resources: resource._id}}, {new: true},  function(err, doc) {
                 //console.log(err, doc)
            })
           
        })
        
        return result;

    },
    insertMemoirs: async function () {
        let memoirArray = []
        for (let i = 0; i < this.dummyQ; i ++) {
            memoirArray.push({
                title: faker.lorem.sentence(),
                subtitle: faker.lorem.sentence(),
                text: faker.lorem.paragraphs(),
                user: this.userIDS[i],
                dummy: true
            })
        }
        let result = await Memoirs.create(memoirArray);
        result.forEach( memoir => {
            Users.updateOne({_id: memoir.user}, {$push: { memoirs: memoir._id}}, {new: true},  function(err, doc) {
                 //console.log(err, doc)
            })
           
        })
        return result;

    },


}

module.exports = DummyDataService;