import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

@Table({
  tableName: "contact",
  timestamps: true,
})
export class Contact extends Model<Contact> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({ type: DataType.STRING, defaultValue: null })
  phoneNumber?: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  email?: string;

  @ForeignKey(() => Contact)
  @Column(DataType.INTEGER)
  linkedId?: number;

  @Column({
    type: DataType.ENUM("primary", "secondary"),
    defaultValue: "primary",
  })
  linkPrecedence!: "primary" | "secondary";

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt!: Date;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  updatedAt!: Date;

  @Column({ type: DataType.DATE, defaultValue: null })
  deletedAt?: Date;
}
