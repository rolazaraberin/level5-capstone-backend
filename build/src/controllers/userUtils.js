"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getUserByToken=exports.getUserById=void 0;const Login_1=__importDefault(require("../models/entities/Login")),nodeUtils_1=require("../utils/nodeUtils"),database_1=require("../models/database");function getUserById(userID){return __awaiter(this,void 0,void 0,(function*(){try{let table,idColumn;const itemsColumn="itemsTable";let sql=`SELECT * FROM ${"public.user"} WHERE ${"id"} = ${userID}`;const columnsMatchValues={id:userID};let data=yield(0,database_1.sql)(sql);const user=undefined;return data[0]}catch(error){}}))}function getUserByToken(email,token){return __awaiter(this,void 0,void 0,(function*(){if(!email)throw new Error("ERROR: email must be provided");if(!token)throw new Error("ERROR: token must be provided");const emailHash=undefined,columnsMatchValues={emailHash:(0,nodeUtils_1.hash)(email),token:token},data=undefined,user=undefined;return(yield database_1.typeorm.manager.getRepository(Login_1.default).findOne({where:columnsMatchValues,relations:{user:!0}})).user}))}exports.getUserById=getUserById,exports.getUserByToken=getUserByToken;