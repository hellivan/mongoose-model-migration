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



