// Re-export all lessons so Parcel bundles them in the formation chunk.
// We use static imports so Parcel picks them all up and code-splits
// them under one async chunk (or inlines them, depending on tree-shaking).
//
// Total payload: ~330 ko — acceptable for a portfolio "formation" page
// where users explicitly click to open a lesson.

import l1_1 from "./lessons/lecon_1_1.json";
import l1_2 from "./lessons/lecon_1_2.json";
import l1_3 from "./lessons/lecon_1_3.json";
import l1_4 from "./lessons/lecon_1_4.json";
import l1_5 from "./lessons/lecon_1_5.json";
import l1_6 from "./lessons/lecon_1_6.json";
import l1_7 from "./lessons/lecon_1_7.json";
import l1_8 from "./lessons/lecon_1_8.json";
import l1_9 from "./lessons/lecon_1_9.json";
import l1_10 from "./lessons/lecon_1_10.json";
import l1_11 from "./lessons/lecon_1_11.json";
import l1_12 from "./lessons/lecon_1_12.json";
import l1_13 from "./lessons/lecon_1_13.json";
import l1_14 from "./lessons/lecon_1_14.json";
import l1_15 from "./lessons/lecon_1_15.json";
import l1_16 from "./lessons/lecon_1_16.json";
import l1_17 from "./lessons/lecon_1_17.json";
import l1_18 from "./lessons/lecon_1_18.json";
import l1_19 from "./lessons/lecon_1_19.json";
import l1_20 from "./lessons/lecon_1_20.json";
import l2_1 from "./lessons/lecon_2_1.json";
import l2_2 from "./lessons/lecon_2_2.json";

const ALL = [
  l1_1, l1_2, l1_3, l1_4, l1_5, l1_6, l1_7, l1_8, l1_9, l1_10,
  l1_11, l1_12, l1_13, l1_14, l1_15, l1_16, l1_17, l1_18, l1_19, l1_20,
  l2_1, l2_2,
];

// Build a map id -> lesson (each lesson file is a list of one)
const LESSONS_BY_ID = {};
ALL.forEach((arr) => {
  const lesson = arr[0];
  const id = `lecon_${lesson.lecon_numero.replace(".", "_")}`;
  LESSONS_BY_ID[id] = lesson;
});

export function getLesson(id) {
  return LESSONS_BY_ID[id] || null;
}
