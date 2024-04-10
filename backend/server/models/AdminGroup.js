const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const SplitGroup = require("./SplitGroup");

class AdminGroup extends Model {}

AdminGroup.init(
  {
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "AdminGroup",
    freezeTableName: true,
    timestamps: false,
  }
);

AdminGroup.belongsTo(User, {
  foreignKey: "admin_id",
  onDelete: "CASCADE",
  as: "admin",
});

AdminGroup.belongsTo(SplitGroup, {
  foreignKey: "group_id",
  onDelete: "CASCADE",
  as: "splitGroup",
});

AdminGroup.beforeCreate(async (adminGroup, options) => {
  const isMember = await sequelize.models.Member.count({
    where: {
      member_id: adminGroup.admin_id,
      group_id: adminGroup.group_id,
    },
  });

  if (isMember === 0) {
    throw new Error("Admin must also be a member of the corresponding group");
  }
});

module.exports = AdminGroup;
