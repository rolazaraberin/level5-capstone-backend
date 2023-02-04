"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../models/database");
const utilityFunctions_1 = require("../utils/utilityFunctions");
const nodeUtils_1 = require("../utils/nodeUtils");
const sendEmail_1 = __importDefault(require("./sendEmail"));
const dbToken_1 = __importDefault(require("./dbToken"));
const Login_1 = __importDefault(require("../models/entities/Login"));
const User_1 = __importDefault(require("../models/entities/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const signup = { withPassword };
exports.default = signup;
dotenv_1.default.config();
const disableEmails = process.env.disableEmails;
function withPassword(request, response, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = request.body;
            yield validate(email);
            yield database_1.typeorm.transaction(function (manager) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = createAccount(email);
                    const data = yield manager.insert(User_1.default, user);
                    user.id = data.raw[0].id;
                    // const userID = data.raw[0].id;
                    const login = yield createLogin(email, password, user);
                    const token = dbToken_1.default.getNew(email);
                    login.token = token;
                    yield manager.insert(Login_1.default, login);
                    // await dbToken.save(email, token);
                    const authInfo = { email, token };
                    response.status(200).send(authInfo);
                });
            });
            // const userID = await createLogin(email, password);
            // const userID = await authenticate(request.body);
            // if (userID) return response.status(409).send("ERROR: Account already exists");
            // if (!account)
            //   return response.status(401).send("ERROR: Cannot retrieve account");
            if (disableEmails !== "true")
                sendEmail_1.default.signupConfirmation(email);
        }
        catch (_error) {
            const error = yield _error;
            const message = error.message;
            const code = error.code || 400;
            response.status(code).send(message);
        }
    });
}
function validate(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailHash = (0, nodeUtils_1.hash)(email);
        // const passwordHash = hash(password);
        // const table = "login";
        // const columns = ["emailHash"];
        // const columns = ["emailHash", "passwordHash"];
        // let sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}'`;
        // let data = await runRaw(sql);
        const columnsMatchValues = { emailHash };
        const data = yield database_1.typeorm.manager
            .getRepository(Login_1.default)
            .findOne({ where: columnsMatchValues });
        if (!(0, utilityFunctions_1.isEmpty)(data)) {
            const error = new Error("ERROR: Account already exists");
            error.code = 409;
            throw error;
        }
        else
            return "Email validated";
    });
}
function createLogin(email, password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        // const table = "login";
        // const columns = ["emailHash", "passwordHash", "userID"];
        // const values = [emailHash, passwordHash, userID].map((value) => `'${value}'`);
        // const sql = `INSERT INTO ${table} ( ${columns} ) VALUES ( ${values} )`;
        // const data = await knex
        //   .table(table)
        //   .insert({ emailHash, passwordHash, userID });
        // const data = await db.sql(sql);
        // const userID = isEmpty(data) ? null : data[0].userID;
        const emailHash = (0, nodeUtils_1.hash)(email);
        const passwordHash = (0, nodeUtils_1.hash)(password);
        const login = new Login_1.default();
        login.emailHash = emailHash;
        login.passwordHash = passwordHash;
        login.user = user;
        return login;
        // const data = await typeorm.getRepository(Login).insert(login);
        // return "SUCCESS: Created login";
        // return userID;
        // } catch (mismatchingEmailAndPassword) {
        // return null;
        // }
    });
}
function createAccount(email) {
    // const table = "user";
    // const columns = ["email"];
    // const values = [email];
    // let sql = `INSERT INTO ${table} ( ${columns} ) VALUES ( '${values}' )`;
    // let data = await runRaw(sql);
    // sql = `SELECT * FROM ${table} WHERE id = ${id}`;
    // data = await runRaw(sql);
    const user = new User_1.default();
    user.email = email;
    // const data = await typeorm.getRepository(User).insert(user);
    // const id = data.raw[0].id;
    // const columnsMatchValues = { id };
    // const account = await typeorm
    //   .getRepository(User)
    //   .findOne({ where: columnsMatchValues });
    // return account;
    return user;
}
