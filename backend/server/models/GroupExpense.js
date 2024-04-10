const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const SplitGroup = require("./SplitGroup");

const GroupExpense = sequelize.define(
  "GroupExpense",
  {
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expense_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

GroupExpense.belongsTo(SplitGroup, {
  foreignKey: "group_id",
  onDelete: "CASCADE",
  as: "splitGroup",
});

module.exports = GroupExpense;
