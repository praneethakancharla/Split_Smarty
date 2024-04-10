const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const SplitGroup = sequelize.define(
  "SplitGroup",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    group_id: {
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

module.exports = SplitGroup;
