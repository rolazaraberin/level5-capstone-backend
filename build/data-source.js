"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const typeorm_1=require("typeorm"),User_1=__importDefault(require("./src/models/entities/User")),Login_1=__importDefault(require("./src/models/entities/Login")),_1672176285655_addData_1=__importDefault(require("./src/models/entities/1672176285655-addData")),dotenv_1=__importDefault(require("dotenv"));dotenv_1.default.config();const databaseName=process.env.mode,AppDataSource=getDataSource(databaseName);function getDataSource(dataSourceName){const dataSources=undefined,dataSource=undefined;return{mysql:new typeorm_1.DataSource({type:"mysql",host:"localhost",username:process.env.mysqlUser,password:process.env.mysqlPassword,database:process.env.mysqlDatabase,synchronize:!0,logging:!1,entities:[User_1.default,Login_1.default],migrations:[_1672176285655_addData_1.default],subscribers:[]}),elephantsql:new typeorm_1.DataSource({type:"postgres",url:process.env.elephantsql,synchronize:!0,logging:!1,entities:[User_1.default,Login_1.default],migrations:[_1672176285655_addData_1.default],subscribers:[]}),cockroachdb:new typeorm_1.DataSource({type:"cockroachdb",url:process.env.cockroachdb,ssl:!0,synchronize:!0,logging:!1,entities:[User_1.default,Login_1.default],migrations:[_1672176285655_addData_1.default],subscribers:[]})}[dataSourceName]}exports.default=AppDataSource;