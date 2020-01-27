"use strict";
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define("TodoItem", {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  TodoItem.associate = function(models) {
    // associations can be defined here
  };
  return TodoItem;
};
