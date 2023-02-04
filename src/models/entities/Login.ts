import {
  Entity,
  // PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // JoinColumn,
  // OneToMany,
  // ManyToOne,
  // OneToOne,
  // ManyToMany,
  // JoinTable,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
// import { Mentor } from "./Mentor";
// import { Profile } from "./Profile";
// import { Badge } from "./Badge";
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

  // @Column({ nullable: true })
  // mentorId: number; //THIS GETS ADDED AUTOMATICALLY BY ENTITY RELATION

  //MANY STUDENTS TO ONE MENTOR
  // @ManyToOne(() => Mentor, (mentor) => mentor.students)
  // @JoinColumn() //OPTIONAL FOR @ManyToOne JOINED TO @OneToOne
  // mentor: Mentor;

  //ONE PROFILE PER ONE STUDENT
  // @OneToOne(() => Profile)
  // @JoinColumn() //OPTIONAL FOR @OneToOne
  // profile: Profile;

  //MANY STUDENTS EARN MANY BADGES
  // @ManyToMany(() => Badge, (badge) => badge.students, { cascade: true })
  // @JoinTable() //ONLY ONE @JoinTable() PER MANY-TO-MANY RELATION
  // badges: Badge[];
}

export default Login;
