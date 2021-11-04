'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    userId: {
      references: {
        model: 'Users',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    campaignId: {
      references: {
        model: 'Campaigns',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    postUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    numClicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: 0
    },
    numLikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: 0
    },
    numComments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: 0
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      },
      defaultValue: false
    },
    socialMedia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};