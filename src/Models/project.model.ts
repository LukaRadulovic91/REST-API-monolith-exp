import { Model, DataTypes, Optional, HasManyGetAssociationsMixin, HasOneGetAssociationMixin } from 'sequelize';
import { sequelize } from '../database';
import { Task } from './task.model';
import { User } from './user.model';

interface ProjectAttributes {
    id: number;
    name: string;
    userId: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
    public id!: number;
    public name!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getTasks!: HasManyGetAssociationsMixin<Task>;
    public getUser!: HasOneGetAssociationMixin<User>;
}

Project.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, {
    tableName: 'projects',
    sequelize,
});
