const BadgeStyles = {
  // background: "#e7e7e7",
  background:'#fffbcf',
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  minWidth: "35px",
  padding: "0 .6rem",
  fontSize: ".75rem",
  borderRadius: "1rem",
};

type CustomBadgeProps = {
  label: string;
  key?: string;
};

const CustomBadge = ({ label }: CustomBadgeProps) => {
  return <span style={BadgeStyles}>&nbsp;{label}</span>;
};

export default CustomBadge;
