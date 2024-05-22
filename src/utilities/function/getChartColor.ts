import color from "styles/enums/color";

export function getDashboardChartColor(percent: number) {
  //     "OPE <50% màu đỏ
  // 50% - 75% màu vàng
  // 75% - 100% màu xanh lá
  // Mốc mong muốn (85%) "
  if (percent < 50) {
    return color.error;
  } else if (percent < 75) {
    return color.yellow;
  } else if (percent < 85) {
    return color.green;
  } else {
    return color.green;
  }
}
