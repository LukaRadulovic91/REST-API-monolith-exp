import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

// 1. TypeScript interface
interface RoleAttributes {
    id: number;
    name: string; // Pretpostavljamo da postoji atribut `name`
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

// 2. Sequelize model klasa
export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public id!: number;
    public name!: string;

    // timestamps (createdAt, updatedAt)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// 3. Inicijalizacija modela
Role.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'roles',
        modelName: 'Role',
    }
);
