import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // JoinColumn,
  // JoinTable,
  PrimaryColumn,
} from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column()
  cartID: number;
}

export default User;
