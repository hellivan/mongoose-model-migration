# mongoose-model-migration

[![Build Status](https://img.shields.io/circleci/build/github/hellivan/mongoose-model-migration/master?logo=circleci&style=flat-square)](https://circleci.com/gh/hellivan/mongoose-model-migration)
[![Code Coverage](https://img.shields.io/codecov/c/github/hellivan/mongoose-model-migration/master?logo=codecov&style=flat-square)](https://codecov.io/gh/hellivan/mongoose-model-migration)
[![MIT License](https://img.shields.io/npm/l/mongoose-model-migration?style=flat-square)](LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square)](https://renovatebot.com/)
[![NPM Package](https://img.shields.io/npm/v/mongoose-model-migration?logo=npm&style=flat-square)](https://www.npmjs.com/package/mongoose-model-migration)
[![NPM Package Downloads](https://img.shields.io/npm/dm/mongoose-model-migration?logo=npm&style=flat-square)](https://www.npmjs.com/package/mongoose-model-migration)

Utility library that provides some basic mechanisms for versioning and upgrading mongoose models in Node.js

## Installation

Using npm:

```
npm install --save mongoose-model-migration
```

Using yarn

```
yarn add mongoose-model-migration
```

## Usage

In ES6 / Typescript

```typescript
import { migrateModel, migrateCollection } from 'mongoose-model-migration';
```

### Basic Collection migration

```typescript
import { migrateCollection, CollectionMigrationHandler } from 'mongoose-model-migration';

const migrationHandler: CollectionMigrationHandler = {
    up: async (db, collection, fromVersion, toVersion) => {
        // ... call upgrate operations for collection
    },
    down: async (db, collection, fromVersion, toVersion) => {
        // ... call downgrade operations for collection
    }
};

await migrateCollection('users', 2, migrationHandler);
```

### Collection migration options

`migrateCollection` accepts an optional options object as 4th parameter:

| option                | Description                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| db                    | Optionally specify the mongodb database that should be used during migration. Defaults to the global mongoose `connection.db`      |
| versionCollectionName | Optionally specify the collection name that should be used to store version information. Defaults to `collectionName + '.version'` |
