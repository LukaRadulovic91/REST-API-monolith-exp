import {Task} from "./task.model";
import {User} from "./user.model";
import {Role} from "./role.model";
import {Project} from "./project.model";
import {Comment} from "./comment.model";

User.hasOne(Role, { foreignKey: 'id', sourceKey: 'roleId', as: 'role' });
Role.belongsTo(User, { foreignKey: 'id', targetKey: 'roleId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });
