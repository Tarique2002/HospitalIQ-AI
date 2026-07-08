interface Props {
  active: boolean;
}

export default function UserStatus({ active }: Props) {
  return (
    <span
      className="badge"
      style={
        active
          ? {
              background: "rgba(16,185,129,0.12)",
              color: "#34d399",
              border: "1px solid rgba(16,185,129,0.2)",
            }
          : {
              background: "rgba(239,68,68,0.12)",
              color: "#f87171",
              border: "1px solid rgba(239,68,68,0.2)",
            }
      }
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}