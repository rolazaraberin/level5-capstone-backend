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
const User_1 = __importDefault(require("./User"));
const Login_1 = __importDefault(require("./Login"));
// import AppDataSource from "../../../data-source";
const utilityFunctions_1 = require("../../utils/utilityFunctions");
class addData1672176285655 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   await queryRunner.createTable(new Table({ name: "user" }));
            // } catch (ignoreTableError) {}
            // try {
            //   await queryRunner.createTable(new Table({ name: "login" }));
            // } catch (ignoreTableError) {}
            // try {
            //   await AppDataSource.initialize();
            // } catch (ignoreError) {}
            const users = queryRunner.manager.getRepository(User_1.default);
            const logins = queryRunner.manager.getRepository(Login_1.default);
            yield createTables(users, logins);
            let user, login;
            user = new User_1.default();
            user.email = "rolazaraberin@gmail.com";
            user.name = "Rolazar Aberin";
            user.cartID = 1;
            const rolazar = yield users.save(user);
            // await timeout(9000);
            user = new User_1.default();
            user.email = "correct@email.com";
            user.name = "correct";
            const correct = yield users.save(user);
            // await timeout(3000);
            login = new Login_1.default();
            login.emailHash =
                "1e9b4ffec7e769ede61e5ce942193ab13db7e9e8d170bb89b6411cfc7dec5e18";
            login.passwordHash =
                "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
            login.user = rolazar;
            yield logins.save(login);
            // await timeout(3000);
            // await logins.save({
            //   emailHash:
            //     "1e9b4ffec7e769ede61e5ce942193ab13db7e9e8d170bb89b6411cfc7dec5e18",
            //   passwordHash:
            //     "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
            //   user: rolazar,
            // });
            login = new Login_1.default();
            login.emailHash =
                "425bee187ab12fdfe19ea39148510c2a7bf5fce9957f296b90a3dc478e280b78";
            login.passwordHash =
                "e231b8ff6659dcbbec5aaa6a252d132de5a8dfb8e40167c45e4eb0ffb71a7065";
            login.user = correct;
            yield logins.save(login);
            // await logins.save({
            //   emailHash:
            //     "425bee187ab12fdfe19ea39148510c2a7bf5fce9957f296b90a3dc478e280b78",
            //   passwordHash:
            //     "e231b8ff6659dcbbec5aaa6a252d132de5a8dfb8e40167c45e4eb0ffb71a7065",
            //   user: correct,
            // });
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("public.login");
            yield queryRunner.dropTable("public.user");
            // await queryRunner.dropTable("level_5_capstone_project.login");
            // await queryRunner.dropTable("level_5_capstone_project.user");
            // await queryRunner.dropTable("typeorm_apprentice_1.student");
            // await queryRunner.dropTable("typeorm_apprentice_1.mentor");
            // queryRunner.dropTable("student");
            // queryRunner.dropTable("mentor");
        });
    }
}
exports.default = addData1672176285655;
function createTables(...repositories) {
    return __awaiter(this, void 0, void 0, function* () {
        //find() AND count() WILL CREATE A TABLE IF IT DOESN'T EXIST
        repositories.forEach((repository) => __awaiter(this, void 0, void 0, function* () { return yield repository.find(); }));
        //DATABASE NEEDS MORE TIME FOR THE TABLE TO BE CREATED
        yield (0, utilityFunctions_1.timeout)(5000);
    });
}
// function createUser(email: string, name?: string) {
//   const user = new User();
//   user.email = email;
//   user.name = name;
//   return user;
// }
// function createLogin(emailHash: string, passwordHash: string) {
//   const login = new Login();
//   login.emailHash = emailHash;
//   login.passwordHash = passwordHash;
//   return login;
// }
