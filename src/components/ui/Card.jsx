// src/components/ui/Card.jsx
export function Card({ children, className = "" }) {
  return <div className={`border rounded p-0 ${className}`}>{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function CardHeader({ children, className }) {
  return <div className={className}>{children}</div>;
}
export function CardTitle({ children, className }) {
  return <h3 className={className}>{children}</h3>;
}
