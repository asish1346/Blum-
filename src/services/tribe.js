import colors from "colors";
import delayHelper from "../helpers/delay.js";

class TribeService {
  constructor() {}

  // Define the getInfo method here
  async getInfo(user) {
    try {
      const { data } = await user.http.get(2, "tribe/my");
      if (data) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.response?.data?.message === "NOT_FOUND") {
        return false;
      } else {
        return null;
      }
    }
  }

  async getLeaderboard(user) {
    try {
      const { data } = await user.http.get(2, "tribe/leaderboard");
      if (data) {
        const top100 = data.items.slice(0, 100);
        const tribeSkip = user?.database?.tribeSkip || [
          "bd685a99-0d2d-495c-85e5-ed5699e44a83",
        ];
        return top100
          .filter((tribe) => !tribeSkip.includes(tribe.id))
          .map((tribe) => tribe.id);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return [];
    }
  }

  async joinTribe(
    user,
    tribeId = "bd685a99-0d2d-495c-85e5-ed5699e44a83",
    skipLog = false
  ) {
    const endpoint = `tribe/${tribeId}/join`;
    try {
      const { data } = await user.http.post(2, endpoint, {});
      if (data) {
        if (!skipLog) {
          user.log.log(
            "Successfully joined Tribe: " + colors.rainbow("Looters Era") + " 🌈"
          );
        }
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (!skipLog) {
        user.log.logError(
          `Failed to join tribe: ${error.response?.data?.message}`
        );
      }
    }
  }

  async leaveTribe(user) {
    const endpoint = `tribe/leave`;
    try {
      const { data } = await user.http.post(2, endpoint, {});

      if (data) {
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return false;
    }
  }

  async handleTribe(user) {
    const infoTribe = await this.getInfo(user);  // This line is calling getInfo

    if (infoTribe === null) return;

    if (!infoTribe) {
      await this.joinTribe(user);
    } else {
      const top100 = await this.getLeaderboard(user);
      const canLeaveTribe = top100.includes(infoTribe.id);

      if (canLeaveTribe) {
        await this.leaveTribe(user);
        await delayHelper.delay(3);
        await this.joinTribe(
          user,
          "bd685a99-0d2d-495c-85e5-ed5699e44a83",
          true
        );
      }
    }
  }
}

const tribeService = new TribeService();
export default tribeService;
