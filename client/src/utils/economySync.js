import API from "../services/api";

export const syncUserCoins = async () => {
  try {
    const { data } = await API.get("/users/profile");
    const localUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!localUser) return;

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...localUser,
        coins: data.user?.coins ?? localUser.coins,
        dailyCoins: data.user?.dailyCoins ?? localUser.dailyCoins ?? 0
      })
    );
  } catch (error) {
    // Keep UI resilient if profile refresh fails.
  }
};