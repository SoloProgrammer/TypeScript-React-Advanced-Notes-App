const BadgeStyles = {
  background: "#e7e7e7",
  boxShadow: "0 0 0 .5px rgba(0,0,0,.3)",
  minWidth: "35px",
  padding: "0rem .6rem",
  fontSize: ".8rem",
  borderRadius: "1rem",
};

type CustomBadgeProps = {
  label: string;
  key?: string;
};

const CustomBadge = ({ label }: CustomBadgeProps) => {
  return <span style={BadgeStyles}>#&nbsp;{label}</span>;
};

export default CustomBadge;
