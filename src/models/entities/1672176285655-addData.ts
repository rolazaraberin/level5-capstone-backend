import { MigrationInterface, QueryRunner, Repository, Table } from "typeorm";
import User from "./User";
import Login from "./Login";
// import AppDataSource from "../../../data-source";
import { timeout } from "../../utils/utilityFunctions";

class addData1672176285655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // try {
    //   await queryRunner.createTable(new Table({ name: "user" }));
    // } catch (ignoreTableError) {}
    // try {
    //   await queryRunner.createTable(new Table({ name: "login" }));
    // } catch (ignoreTableError) {}
    // try {
    //   await AppDataSource.initialize();
    // } catch (ignoreError) {}

    const users = queryRunner.manager.getRepository(User);
    const logins = queryRunner.manager.getRepository(Login);

    await createTables(users, logins);
    await timeout(5000);
    //NOTE: THIS FILE GETS INDEXED
    //MAKE CHANGES FOR MIGRATION TO WORK

    let user: User, login: Login;

    //PERMANENT USER////////////////////////////////
    //FOR TABLE DUPLICATION

    user = new User();
    user.id = 1;
    user.email = "permanent@email.com";
    user.name = "permanent";
    user.cartID = 1;
    const permanent = await users.save(user);
    await timeout(3000);

    login = new Login();
    login.emailHash =
      "9f48863b648541998753fd09be67fd3d44440f51a8b1d5e9eef61d1365bbca4f";
    login.passwordHash =
      "0dd1b6d5c52eec73e28b235214478c1da599a278f8d7a3216b3ce36db39f29d4";
    login.user = permanent;
    await logins.save(login);

    //CORRECT USER////////////////////////////////////
    //FOR TESTING PURPOSES

    user = new User();
    user.id = 2;
    user.email = "correct@email.com";
    user.name = "correct";
    user.cartID = 2;
    const correct = await users.save(user);
    await timeout(3000);

    login = new Login();
    login.emailHash =
      "425bee187ab12fdfe19ea39148510c2a7bf5fce9957f296b90a3dc478e280b78";
    login.passwordHash =
      "e231b8ff6659dcbbec5aaa6a252d132de5a8dfb8e40167c45e4eb0ffb71a7065";
    login.user = correct;
    await logins.save(login);
    await timeout(3000);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("public.login");
    await queryRunner.dropTable("public.user");
    // await queryRunner.dropTable("level_5_capstone_project.login");
    // await queryRunner.dropTable("level_5_capstone_project.user");
    // await queryRunner.dropTable("typeorm_apprentice_1.student");
    // await queryRunner.dropTable("typeorm_apprentice_1.mentor");

    // queryRunner.dropTable("student");
    // queryRunner.dropTable("mentor");
  }
}

export default addData1672176285655;

async function createTables(...repositories: Repository<any>[]) {
  //find() AND count() WILL CREATE A TABLE IF IT DOESN'T EXIST
  repositories.forEach(async (repository) => await repository.find());
  //DATABASE NEEDS MORE TIME FOR THE TABLE TO BE CREATED
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
