export const formatDescription = (text: string) => {
  return text.split(/(?<=[.!?])\s+(?=[А-ЯA-Z])/).map((part, index) => (
    <p key={index} className={index > 0 ? "mt-2" : ""}>
      {part}
    </p>
  ));
};
