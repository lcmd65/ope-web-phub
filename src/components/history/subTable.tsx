import color from "styles/enums/color";
import { BatchDetail } from "./content";

const SubBatchDetailTable = (props: {
  batchVisDetail: BatchDetail;
  batchAdDetail: BatchDetail;
  batchPHDetail: BatchDetail;
}) => {
  return (
    <div className="w-full">
      <TableRow
        data={[
          { value: "Khối lượng Mixer" },
          { value: props.batchVisDetail.weight ?? "-" },
          { value: "Nhiệt độ" },
          { value: props.batchVisDetail.temperature ?? "-" },
        ]}
      />
      <TableRow
        data={[
          { value: "Áp suất tuần hoàn" },
          { value: props.batchVisDetail.pressure ?? "-" },
          { value: "Tốc độ bơm tuần hoàn" },
          { value: props.batchVisDetail.pumpSpeed ?? "-" },
        ]}
      />
      <div className="m-2">
        <h2>Vis</h2>
      </div>
      <TableRow
        data={[
          { value: "Kết quả dự đoán" },
          {
            value: props.batchVisDetail.predictedValue ?? "-",
            color:
              (props.batchVisDetail.predictedValue ?? 0) > (props.batchVisDetail.safeValueRange[0] ?? 0) &&
              (props.batchVisDetail.predictedValue ?? 0) < (props.batchVisDetail.safeValueRange[1] ?? 0)
                ? color.green
                : color.error,
          },
          { value: "Vis thực tế" },
          { value: props.batchVisDetail.actualValue ?? "-" },
        ]}
      />
      <TableRow
        data={[
          { value: "Giá trị quy định" },
          { value: `${props.batchVisDetail.regulatedValueRange[0] ?? "."}` },
          { value: `${props.batchVisDetail.regulatedValueRange[1] ?? "."}` },
        ]}
      />
      <TableRow
        data={[
          { value: "Giá trị an toàn" },
          { value: `${props.batchVisDetail.safeValueRange[0] ?? "."}` },
          { value: `${props.batchVisDetail.safeValueRange[1] ?? "."}` },
        ]}
      />
      <div className="m-2">
        <h2>AD</h2>
      </div>
      <TableRow
        data={[
          { value: "Kết quả dự đoán" },
          {
            value: props.batchAdDetail.predictedValue ?? "-",
            color:
              (props.batchAdDetail.predictedValue ?? 0) > (props.batchAdDetail.safeValueRange[0] ?? 0) &&
              (props.batchAdDetail.predictedValue ?? 0) < (props.batchAdDetail.safeValueRange[1] ?? 0)
                ? color.green
                : color.error,
          },
          { value: "AD thực tế" },
          { value: props.batchAdDetail.actualValue ?? "-" },
        ]}
      />
      <TableRow
        data={[
          { value: "Giá trị quy định" },
          { value: `${props.batchAdDetail.regulatedValueRange[0] ?? "."}` },
          { value: `${props.batchAdDetail.regulatedValueRange[1] ?? "."}` },
        ]}
      />
      <TableRow
        data={[
          { value: "Giá trị an toàn" },
          { value: `${props.batchAdDetail.safeValueRange[0] ?? "."}` },
          { value: `${props.batchAdDetail.safeValueRange[1] ?? "."}` },
        ]}
      />
      <div className="m-2">
        <h2>pH</h2>
      </div>
      <TableRow
        data={[
          { value: "Kết quả dự đoán" },
          {
            value: props.batchPHDetail.predictedValue ?? "-",
            color:
              (props.batchPHDetail.predictedValue ?? 0) > (props.batchPHDetail.safeValueRange[0] ?? 0) &&
              (props.batchPHDetail.predictedValue ?? 0) < (props.batchPHDetail.safeValueRange[1] ?? 0)
                ? color.green
                : color.error,
          },
          { value: "pH thực tế" },
          { value: props.batchPHDetail.actualValue ?? "-" },
        ]}
      />
      <TableRow
        data={[
          { value: "Giá trị quy định" },
          { value: `${props.batchPHDetail.regulatedValueRange[0] ?? "."}` },
          { value: `${props.batchPHDetail.regulatedValueRange[1] ?? "."}` },
        ]}
      />
      <TableRow
        data={[
          { value: "Giá trị an toàn" },
          { value: `${props.batchPHDetail.safeValueRange[0] ?? "."}` },
          { value: `${props.batchPHDetail.safeValueRange[1] ?? "."}` },
        ]}
      />
    </div>
  );
};
const TableRow = (props: { data: { value: any; color?: any }[] }) => {
  // Check if the length of data is 2
  if (props.data.length === 3) {
    return (
      <div className="w-full flex">
        <div className="w-1/4 border border-solid px-[12px] py-[4px]">
          <h2>{props.data[0].value}</h2>
        </div>
        <div className="w-3/4 border border-solid px-[12px] py-[4px] text-center flex justify-evenly">
          <div className="w-[50px]">
            <h2>{props.data[1].value}</h2>
          </div>
          <h2>-</h2>
          <div className="w-[50px]">
            <h2>{props.data[2].value}</h2>
          </div>
        </div>
      </div>
    );
  }

  // Render the data normally for other cases
  return (
    <div className="w-full flex">
      {props.data.map((item, index) => {
        return (
          <div
            className="w-full border border-solid px-[12px] py-[4px]"
            style={{ backgroundColor: item.color }}
            key={index}
          >
            <h2 style={{ textAlign: index % 2 === 1 ? "center" : "left" }}>{item.value}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default SubBatchDetailTable;
