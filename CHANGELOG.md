<a name="0.1.7"></a>
## [0.1.7](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.6...v0.1.7) (2018-09-11)


### Bug Fixes

* increase mongoose peer dep range to >=4.0.0 <6.0.0 ([f1db469](https://github.com/hellivan/mongoose-model-migration/commit/f1db469))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.5...v0.1.6) (2018-09-11)


### Bug Fixes

* increase mongoose peer dep range to >=4.7.3 <6.0.0 ([1ba6d91](https://github.com/hellivan/mongoose-model-migration/commit/1ba6d91))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.4...v0.1.5) (2018-09-07)


### Bug Fixes

* version update error ([8513876](https://github.com/hellivan/mongoose-model-migration/commit/8513876))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.3...v0.1.4) (2018-05-03)


### Bug Fixes

* migrate function does not return promise in all cases ([8704119](https://github.com/hellivan/mongoose-model-migration/commit/8704119))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.2...v0.1.3) (2018-05-02)



<a name="0.1.2"></a>
## [0.1.2](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.1...v0.1.2) (2017-12-06)


### Features

* allow specifying version-collection name as thrid parameter for all migrators ([342394a](https://github.com/hellivan/mongoose-model-migration/commit/342394a))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/hellivan/mongoose-model-migration/compare/v0.1.0...v0.1.1) (2017-10-30)


### Bug Fixes

* typings in source-code ([0b50f2e](https://github.com/hellivan/mongoose-model-migration/commit/0b50f2e))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/hellivan/mongoose-model-migration/compare/v0.0.5...v0.1.0) (2017-10-30)


### Features

* add method for simply upgrading a collection (by name) ([ee2cbf8](https://github.com/hellivan/mongoose-model-migration/commit/ee2cbf8))


### BREAKING CHANGES

* migrateDb was renamed to migrateModel
* writeVersion/readVersion now only accept collection names
* interface Migration was renamed to ModelMigrationHandler
* signature for up/down function of ModelMigrationHandler has changed (last two parameters are now fromVersion, toVersion)



<a name="0.0.5"></a>
## [0.0.5](https://github.com/hellivan/mongoose-model-migration/compare/v0.0.4...v0.0.5) (2017-05-31)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/hellivan/mongoose-model-migration/compare/v0.0.3...v0.0.4) (2017-05-30)


### Bug Fixes

* **Output:** remove console output ([d19a4e2](https://github.com/hellivan/mongoose-model-migration/commit/d19a4e2))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/hellivan/mongoose-model-migration/compare/v0.0.2...v0.0.3) (2017-05-04)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/hellivan/mongoose-model-migration/compare/v0.0.1...v0.0.2) (2016-12-20)



<a name="0.0.1"></a>
## 0.0.1 (2016-12-19)


### Features

* implement method that allows to register upgrade method for a mongoose model 98ec8ea



