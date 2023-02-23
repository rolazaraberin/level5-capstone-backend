import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";

@Entity()
class Login extends BaseEntity {
  @PrimaryColumn()
  emailHash: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  token: string;

  @OneToOne(() => User)
  @JoinColumn() //OPTIONAL FOR @OneToOne
  user: User;
}

export default Login;
