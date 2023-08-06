import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

export enum LinkPrecedence {
  Secondary = "secondary",
  Primary = "primary",
}

@Table({
  tableName: "user_info",
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  phoneNumber?: string;

  @Column(DataType.STRING)
  email?: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  linkedId?: number;

  @Column(DataType.ENUM(...Object.values(LinkPrecedence)))
  linkPrecedence!: LinkPrecedence;

  @Column(DataType.DATE)
  createdAt!: Date;

  @Column(DataType.DATE)
  updatedAt!: Date;

  @Column(DataType.DATE)
  deletedAt?: Date;
}
