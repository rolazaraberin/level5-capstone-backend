"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__rest=this&&this.__rest||function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]]);return t},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const knexfile_1=__importDefault(require("../../knexfile")),knex_1=__importDefault(require("knex")),utilityFunctionsServer_1=require("../utilityFunctionsServer"),utilityFunctions_1=require("../utils/utilityFunctions"),authenticate_1=__importDefault(require("../controllers/authenticate")),cartUtils_1=require("../controllers/cartUtils"),inventoryData=createData("inventory");exports.default={manualData:manualData,cartData:cartData,inventoryData:inventoryData};const knex=(0,knex_1.default)(knexfile_1.default);function createData(route){let mainTable;return"cart"===route&&(mainTable="cart"),"inventory"===route&&(mainTable="inventory"),function(request,response){return __awaiter(this,void 0,void 0,(function*(){try{const validValues=(0,utilityFunctionsServer_1.getValidValues)(request.body),tableData=validValues[mainTable],itemData=validValues.item;let itemsTable=tableData.itemsTable;if(!itemsTable||""===itemsTable){const email=request.body.user.email,emailHash=undefined;itemsTable=(0,utilityFunctions_1.hash)(email)}yield authenticate_1.default.itemsTable(itemsTable);try{yield knex.table(mainTable).insert(tableData)}catch(dataAlreadyExists){yield knex.table(mainTable).update(tableData)}try{yield knex.table(itemsTable).insert(itemData)}catch(dataAlreadyExists){yield knex.table(itemsTable).update(itemData)}let result={};result[mainTable]=yield knex.table(mainTable).select(),result[itemsTable]=yield knex.table(itemsTable).select(),response.status(200).send(result)}catch(error){response.status(400).send(error.message)}}))}}function cartData(request,response,next){return __awaiter(this,void 0,void 0,(function*(){try{const validValues=(0,utilityFunctionsServer_1.getValidValues)(request.body),cart=validValues.cart;if(!cart)return next();const table="cart";try{yield knex.table(table).insert(cart)}catch(dataAlreadyExists){yield knex.table(table).update(cart)}const item=validValues.item,itemsTable=(yield(0,cartUtils_1.getCartById)(cart.id)).itemsTable;try{yield knex.table(itemsTable).insert(item)}catch(dataAlreadyExists){yield knex.table(itemsTable).update(item)}const result=yield(0,cartUtils_1.getCartById)(cart.id);response.status(200).send(result)}catch(error){response.status(400).send(error.message)}}))}function getItemsTable(cartID){return __awaiter(this,void 0,void 0,(function*(){try{const table="cart",columnsMatchValues={id:cartID},data=yield knex.table(table).select().where(columnsMatchValues),itemsTable=undefined;return data[0].itemsTable}catch(error){}}))}function manualData(request,response){return __awaiter(this,void 0,void 0,(function*(){try{const _a=request.body,{table:table}=_a,data=__rest(_a,["table"]);yield knex.insert(data).table(table);const result=yield knex.table(table).select();response.status(200).send(result)}catch(error){response.status(400).send(error.message)}}))}function getKnex(config,knex){switch(config.mode){case"development":return knex(config.development);case"production":return knex(config.remote)}}