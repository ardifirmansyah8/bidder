type Props = {
  text: string;
};

export default function Empty({ text }: Props) {
  return (
    <div className="flex justify-center p-4 w-full">
      <label>{text}</label>
    </div>
  );
}
