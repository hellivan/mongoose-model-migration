import { connect, disconnect } from 'mongoose';
import { UserModel } from './user.model';
import { migrateDb, Migration } from '../lib';

function connectMongo(url) {
    return new Promise((resolve, reject) => {
        connect(url, {}, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
}

const migration = {
    up: (db, model, version) => {
        console.log('up');
        const collection = db.collection(model.collection.name);
        return collection.find({}).forEach((d) => {
            d.hello = d.test;
            delete d.test;

            console.log(`Upgrading user ${d.name}`);
            collection.save(d);
        });
    },
    down: (db, model, version) => {
        console.log('down');
        return Promise.resolve();
    }
};

function seedUser() {
    return new UserModel({
        name: `User ${Math.random()}`,
        active: true
    }).save();
}

connectMongo(`mongodb://localhost:27017/versioning`)
    .then(() => {
        console.log('connected');
        return migrateDb(UserModel, 2, migration as Migration);
    })
    // .then(() => seedUser())
    .then(() => console.log('Done'))
    .catch((err) => console.error(`There was an error: `, err))
    .then(() => disconnect());
