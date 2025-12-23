/**
 * Generate time slots
 * @param {string} startTime - "10:00"
 * @param {string} endTime - "20:00"
 * @param {number} interval - minutes (30, 60)
 */
export const generateTimeSlots = (
  startTime = "10:00",
  endTime = "20:00",
  interval = 60
) => {
  const slots = [];

  let [startHour, startMin] = startTime.split(":").map(Number);
  let [endHour, endMin] = endTime.split(":").map(Number);

  let current = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;

  while (current + interval <= end) {
    const startH = Math.floor(current / 60);
    const startM = current % 60;

    const endSlot = current + interval;
    const endH = Math.floor(endSlot / 60);
    const endM = endSlot % 60;

    const format = (h, m) =>
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

    slots.push(`${format(startH, startM)} - ${format(endH, endM)}`);
    current += interval;
  }

  return slots;
};
