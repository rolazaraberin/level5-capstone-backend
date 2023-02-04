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
    let user: User, login: Login;

    user = new User();
    user.email = "rolazaraberin@gmail.com";
    user.name = "Rolazar Aberin";
    user.cartID = 1;
    const rolazar = await users.save(user);
    // await timeout(9000);

    user = new User();
    user.email = "correct@email.com";
    user.name = "correct";
    const correct = await users.save(user);
    // await timeout(3000);

    login = new Login();
    login.emailHash =
      "1e9b4ffec7e769ede61e5ce942193ab13db7e9e8d170bb89b6411cfc7dec5e18";
    login.passwordHash =
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
    login.user = rolazar;
    await logins.save(login);
    // await timeout(3000);
    // await logins.save({
    //   emailHash:
    //     "1e9b4ffec7e769ede61e5ce942193ab13db7e9e8d170bb89b6411cfc7dec5e18",
    //   passwordHash:
    //     "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    //   user: rolazar,
    // });

    login = new Login();
    login.emailHash =
      "425bee187ab12fdfe19ea39148510c2a7bf5fce9957f296b90a3dc478e280b78";
    login.passwordHash =
      "e231b8ff6659dcbbec5aaa6a252d132de5a8dfb8e40167c45e4eb0ffb71a7065";
    login.user = correct;
    await logins.save(login);

    // await logins.save({
    //   emailHash:
    //     "425bee187ab12fdfe19ea39148510c2a7bf5fce9957f296b90a3dc478e280b78",
    //   passwordHash:
    //     "e231b8ff6659dcbbec5aaa6a252d132de5a8dfb8e40167c45e4eb0ffb71a7065",
    //   user: correct,
    // });
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
  await timeout(5000);
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
