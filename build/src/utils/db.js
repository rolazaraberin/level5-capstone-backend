"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P((function(resolve){resolve(value)}))}return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createDB=exports.knex=exports.createSQL=void 0;const better_sqlite3_1=__importDefault(require("better-sqlite3")),mysql_1=__importDefault(require("mysql")),knex_1=__importDefault(require("knex")),fs_1=__importDefault(require("fs"));function createDB({knexfileConfig:knexfileConfig,AppDataSource:AppDataSource}){let result,sql,knex,typeorm;return result=getKnex(knexfileConfig),knex=result.knex,sql=result.sql,result=getTypeorm(AppDataSource),typeorm=result.typeorm,sql=result.sql,{knex:knex,typeorm:typeorm,sql:sql}}function getKnex(knexfileConfig){if(!knexfileConfig)return{knex:void 0,sql:void 0};const knex=(0,knex_1.default)(knexfileConfig),sql=function(commands,parameters){return __awaiter(this,void 0,void 0,(function*(){const results=undefined;return(yield knex.raw(commands,parameters))[0]}))};return{knex:knex,sql:sql}}function getTypeorm(appDataSource){if(!appDataSource)return{typeorm:void 0,sql:void 0};const typeorm=appDataSource;typeorm.initialize();const sql=function(sqlCommands,parameters){return __awaiter(this,void 0,void 0,(function*(){const results=undefined;return yield typeorm.query(sqlCommands,parameters)}))};return{typeorm:typeorm,sql:sql}}exports.createDB=createDB;const knex=(0,knex_1.default)({client:"mysql",connection:{user:"root",password:"password",database:"sql_apprentice_2",multipleStatements:!0}});exports.knex=knex;class SQL extends better_sqlite3_1.default{constructor(cwd,filename){super(cwd+"/"+filename),this.cwd=cwd,this.filename=filename}runQuery(query,label=""){const results=this.prepare(query).all();return console.log(label,"\n",results,"\n"),results}runFile(filename,cwd=this.cwd){const SQLcommands=fs_1.default.readFileSync(cwd+"/"+filename);this.exec(SQLcommands.toString())}}function createSQL(cwd,filename){const mysql=mysql_1.default.createConnection({host:"localhost",user:"root",password:"password"});return console.log("SUCCESSFUL CONNECTION!"),mysql.raw=mysql_1.default.raw,mysql}exports.createSQL=createSQL,exports.default=SQL;