const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Payment = sequelize.define(
  "Payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount_paid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Payment.belongsTo(User, {
  foreignKey: "from_id",
  onDelete: "CASCADE",
  as: "fromUser",
});

Payment.belongsTo(User, {
  foreignKey: "to_id",
  onDelete: "CASCADE",
  as: "toUser",
});

module.exports = Payment;
