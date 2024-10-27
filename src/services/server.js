import axios from "axios";
import colors from "colors";

class Server {
  constructor() {}

  async getData() {
    try {
      const endpointDatabase =
        "https://cartofarts.com/ashublum.json";
      const { data } = await axios.get(endpointDatabase);
      return data;
    } catch (error) {
      console.log(colors.red("Failed to retrieve data from Thilu server"));
      return null;
    }
  }

  async showNoti() {
    const database = await this.getData();
    if (database && database.noti) {
      console.log(colors.blue("📢 Notifications from the system"));
      console.log(database.noti);
      console.log("");
    }
  }

  async checkVersion(currentVersion, database = null) {
    if (!database) {
      database = await this.getData();
    }

    if (database && currentVersion !== database.ver) {
      console.log(
        colors.yellow(
          `🚀 A new version is available ${colors.blue(
            database.ver
          )}, download it here 👉 ${colors.blue(
            "https://github.com/asish1346/BlumBot"
          )}`
        )
      );
      console.log("");
    }
  }
}

const server = new Server();
export default server;
