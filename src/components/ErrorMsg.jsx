export default function ErrorMsg({ msg }) {
  return (
    <p className="error">
      <span>⛔️</span>
      {msg}
    </p>
  );
}
