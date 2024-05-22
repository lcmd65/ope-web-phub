export function addRequiredMark(value: string) {
  return (
    <div className="flex">
      <span style={{ color: "red" }}>*</span>
      {value}
    </div>
  );
}
