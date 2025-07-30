// src/models/comment.model.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

// 1. Define attributes
interface CommentAttributes {
    id: number;
    content: string;
    user_id: number;
    task_id: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

// 2. Define model
export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public content!: string;
    public user_id!: number;
    public task_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// 3. Register model
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        task_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'comments',
        modelName: 'Comment',
    }
);
