import color from "styles/enums/color";

const TextCard = (props: { value: string }) => {
  return (
    <div className="p-[12px] w-full my-[12px] border rounded-[4px]">
      <p
        style={{
          color: color.black,
        }}
      >
        Note: This is a note
      </p>
    </div>
  );
};

export default TextCard;
