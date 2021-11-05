'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bankId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Banks',
          key: 'id'
        },
        allowNull: false
      },
      offerType: {
        type: Sequelize.ENUM(
          "Charity",
          "Article",
          "Product",
          "Other"
        ),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image: {
        type: Sequelize.BLOB("long"),
        allowNull: true
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      allocatedCash: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0
        },
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Campaigns');
  }
};
