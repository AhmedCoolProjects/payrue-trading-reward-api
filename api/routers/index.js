import { Router } from "express";
import {
  checkEligibility,
  calculateDailyTradingReward,
} from "../controllers/TradingRewardController.js";

const router = Router();
const tradingRewardRouter = Router();

tradingRewardRouter.get("/", (req, res) => {
  res.json({ message: "Trading Reward API" });
});

tradingRewardRouter.post("/", (req, res) => {
  const { eligible, reason } = checkEligibility(req.body.wallet);
  // res.json({ eligible: eligible });
  if (eligible) {
    const { dailyTradingReward } = calculateDailyTradingReward(
      req.body.wallet,
      req.body.dailyTotalTradingVolume,
      req.body.nationalTradingVolume,
      req.body.propelPrice
    );
    res.json({
      dailyTradingReward: dailyTradingReward,
      eligible: eligible,
      reason: reason,
    });
  }
  res.json({ eligible: eligible, reason: reason });
});
router.get("/", (req, res) => {
  res.send("Welcome to PayRue Trading Reward API");
});

router.use("/trading-reward", tradingRewardRouter);

export default router;
