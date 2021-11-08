'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.bulkInsert('Models', [
            {model_name:'X5',brand_id:1,createdAt: new Date(),
                updatedAt: new Date()},
            {model_name:'C 300',brand_id:2,createdAt: new Date(),
                updatedAt: new Date()},
            {model_name:'C 320',brand_id:2,createdAt: new Date(),
                updatedAt: new Date()},
            {model_name:'A8',brand_id:3,createdAt: new Date(),
                updatedAt: new Date()},
        ], {})},

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
