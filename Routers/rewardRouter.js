const express = require('express');
const rewardRouter = express.Router();
const {getAllRewards} = require('../controller/rewardController');

rewardRouter.route('/allrewards')
    .get(getAllRewards)

module.exports = rewardRouter;
