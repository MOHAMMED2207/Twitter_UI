export const formatPostDate = (createdAt: any) => {
  const currentDate: any = new Date();
  const createdAtDate: any = new Date(createdAt);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate - createdAtDate) / 1000
  );
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return createdAtDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (timeDifferenceInDays === 1) {
    return "1d";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours}h`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes}m`;
  } else {
    return "Just now";
  }
};

export const formatMemberSinceDate = (createdAt: any) => {
  const date = new Date(createdAt);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
};



export function formatNumber(value: number): string {
  if (value < 1000) {
    return value.toString();
  } else if (value < 1000000) {
    return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + "k";
  } else if (value < 1000000000) {
    return (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + "m";
  } else if (value < 1000000000000) {
    return (value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 1) + "b";
  } else {
    return (value / 1000000000000).toFixed(value % 1000000000000 === 0 ? 0 : 1) + "t";
  }
}
