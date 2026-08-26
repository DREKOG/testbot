export default function FormNotice({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  if (!message) return null;
  return (
    <div
      className={`rounded-lg border px-3.5 py-2.5 text-sm ${
        type === "success"
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          : "border-red-500/30 bg-red-500/10 text-red-300"
      }`}
    >
      {message}
    </div>
  );
}
