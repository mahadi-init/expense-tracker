import "./../styles/wrapper.css";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="wrapper-container">{children}</div>;
}
