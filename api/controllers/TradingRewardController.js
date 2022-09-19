const AlreadyClaimedTradingRewards = [
  "0x0000000000000000000000000000000000000000",
  "0x0000000000000000000000000000000000000001",
  "0x0000000000000000000000000000000000000002",
];

// Check if the wallet is eligible for trading reward
/**
 * * * @param {Array[token]} wallet.nfts
 * * * @param {address} wallet.id
 * * * @param {Number} wallet.staked
 * @param {*} res
 * @returns {{Boolean, String}} eligible, reason
 */
export const checkEligibility = (wallet) => {
  // If the wallet contains a Penguin NFT
  if (wallet.nfts.length > 0) {
    // Check if the wallet has already claimed the trading reward
    const tradingReward = AlreadyClaimedTradingRewards.find(
      (address) => address === wallet.id
    );
    if (!tradingReward) {
      // If not, return it as eligible
      return { eligible: true, reason: "Eligible for Having Penguin NFT" };
    } else {
      // If yes, return it as not eligible
      return {
        eligible: false,
        reason: "Reward Already claimed for this wallet",
      };
    }
  }
  // If the wallet contain more than 1m Prople staked
  if (wallet.staked >= 1000000) {
    // Check if the wallet has already claimed the trading reward
    const tradingReward = AlreadyClaimedTradingRewards.find(
      (address) => address === wallet.id
    );
    if (!tradingReward) {
      // If not, return it as eligible
      return { eligible: true, reason: "Eligible for Staked Propels" };
    } else {
      // If yes, return it as not eligible
      return {
        eligible: false,
        reason: "Reward Already claimed for this wallet",
      };
    }
  }
  // If not eligible, return it as not eligible
  return {
    eligible: false,
    reason: "Not Eligible, No NFT or enough staked Propels",
  };
};

// Calculate daily reward pool
export const calculateDailyRewardPool = (
  nationalTradingVolume,
  propelPrice
) => {
  // Calculate the daily reward pool
  const dailyRewardPool = (0.1 * nationalTradingVolume) / propelPrice;
  return { dailyRewardPool: dailyRewardPool };
};

// Calculate daily trading reward
/**
 *
 * @param {*} req
 * * @param {*} body
 * * * @param {Number} wallet.totalDailyTrading
 * * * @param {Number} propelPrice
 * * * @param {Number} nationalTradingVolume
 * * * @param {Number} dailyTotalTradingVolume
 * @param {*} res
 * @returns {{Boolean, String}} eligible, reason
 */
export const calculateDailyTradingReward = (
  wallet,
  dailyTotalTradingVolume,
  nationalTradingVolume,
  propelPrice
) => {
  // Get total daily trading by wallet
  const totalDailyTradingForWallet = wallet.totalDailyTrading;
  // Get daily reward pool
  const { dailyRewardPool } = calculateDailyRewardPool(
    nationalTradingVolume,
    propelPrice
  );
  // Calculate daily trading reward
  const dailyTradingReward =
    (totalDailyTradingForWallet / dailyTotalTradingVolume) * dailyRewardPool;
  return { dailyTradingReward: dailyTradingReward };
};

/**
 * 
 * testing 
{
  "wallet":{
    "id":"0x0000000000000000000000000000000000000006",
    "nfts":[],
    "staked":15158484
  }
}
 */
