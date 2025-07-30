import { Model, DataTypes, Optional, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../database';
import { Comment } from './comment.model';

interface TaskAttributes {
    id: number;
    title: string;
    projectId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    public id!: number;
    public title!: string;
    public projectId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getComments!: HasManyGetAssociationsMixin<Comment>;
}

Task.init({
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    projectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
}, {
    tableName: 'tasks',
    sequelize,
});
