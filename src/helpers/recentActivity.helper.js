
export const addRecentActivity = (module, searchText) => {

  const old = JSON.parse(localStorage.getItem("recentActivities") || "[]");

  const newItem = {
    id: searchText,
    type: module,
    status: "Completed",
    time: new Date().toISOString()
  };

  const updated = [newItem, ...old];

  localStorage.setItem("recentActivities", JSON.stringify(updated));
};

export const getRecentActivity = () => {
  return JSON.parse(localStorage.getItem("recentActivities") || "[]");
};

export const formatTime = (iso) => {

  const diff = Date.now() - new Date(iso).getTime();

  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} mins ago`;

  const hrs = Math.floor(mins / 60);
  return `${hrs} hours ago`;
};

export const getTotalSearchCount = () => {
  const list = JSON.parse(localStorage.getItem("recentActivities") || "[]");
  return list.length;
};
