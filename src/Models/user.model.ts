import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasOneGetAssociationMixin } from 'sequelize';
import { sequelize } from '../database';
import { Role } from './role.model';
import { Comment } from './comment.model';
import { Project } from './project.model';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    roleId: number;
    email: string;
    password: string;
    emailVerifiedAt?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'emailVerifiedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public username!: string;
    public roleId!: number;
    public email!: string;
    public password!: string;
    public emailVerifiedAt!: Date | null;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Relations
    public getRole!: HasOneGetAssociationMixin<Role>;
    public getComments!: HasManyGetAssociationsMixin<Comment>;
    public getProjects!: HasManyGetAssociationsMixin<Project>;
}

User.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    emailVerifiedAt: { type: DataTypes.DATE, allowNull: true },
}, {
    tableName: 'users',
    sequelize,
    defaultScope: {
        attributes: { exclude: ['password'] } // exclude password by default
    }
});
