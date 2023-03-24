export type CursorProps = {
  id?: string;
  color?: string;
};

export const Cursor = ({ color }: CursorProps) => {
  return (
    <span className="cursor-container">
      <span
        className="cursor w-[0rem] h-[1.5rem] border-l-2 z-[100] absolute top-0 left-0"
        style={{ borderColor: color }}
      ></span>
      <span
        className="cursor-details w-fit absolute top-[-1rem] left-[0rem] text-[.8rem] p-[.1rem] text-white invisible"
        style={{ backgroundColor: color }}
      >
        Aman
      </span>
    </span>
  );
};
