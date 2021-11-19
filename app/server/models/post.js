'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
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
      allowNull: false,
      type: Sequelize.INTEGER
    },
    campaignId: {
      references: {
        model: 'Campaigns',
        key: 'id'
      },
      allowNull: false,
      type: Sequelize.INTEGER
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    numClicks: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    numLikes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    numComments: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    socialMedia: { // Change this to enum later
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};