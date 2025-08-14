import "./../styles/wrapper.css";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`wrapper-container ${className}`}>{children}</div>;
}
