import { MigrationInterface, QueryRunner, Repository } from "typeorm";
import User from "./User";
import Login from "./Login";

class addData1672176285655 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = queryRunner.manager.getRepository(User);
    const logins = queryRunner.manager.getRepository(Login);

    let user: User, login: Login;

    //PERMANENT USER
    //FOR TABLE DUPLICATION
    user = new User();
    user.id = 1;
    user.email = "permanent@email.com";
    user.name = "permanent";
    user.cartID = 1;
    const permanent = await users.save(user);

    login = new Login();
    login.emailHash =
      "9f48863b648541998753fd09be67fd3d44440f51a8b1d5e9eef61d1365bbca4f";
    login.passwordHash =
      "0dd1b6d5c52eec73e28b235214478c1da599a278f8d7a3216b3ce36db39f29d4";
    login.user = permanent;
    await logins.save(login);

    //CORRECT USER
    //FOR TESTING PURPOSES
    user = new User();
    user.id = 2;
    user.email = "correct@email.com";
    user.name = "correct";
    user.cartID = 2;
    const correct = await users.save(user);

    login = new Login();
    login.emailHash =
      "425bee187ab12fdfe19ea39148510c2a7bf5fce9957f296b90a3dc478e280b78";
    login.passwordHash =
      "e231b8ff6659dcbbec5aaa6a252d132de5a8dfb8e40167c45e4eb0ffb71a7065";
    login.user = correct;
    await logins.save(login);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("public.login");
    await queryRunner.dropTable("public.user");
  }
}

export default addData1672176285655;
