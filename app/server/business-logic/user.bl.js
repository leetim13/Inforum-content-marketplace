exports.addRewardPoint = (user, addition) => {
    return user.rewardPoint + addition; 
}

exports.deductRewardPoint = (user, deduction) => {
    if (user.rewardPoint - deduction < 0) {
        throw Error("deductRewardPoint: can't deduct below zero.");
    }
    return user.rewardPoint - deduction; 
}