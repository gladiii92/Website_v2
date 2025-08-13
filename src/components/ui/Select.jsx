export function Select({ children, value, onValueChange }) {
  return <select value={value} onChange={(e) => onValueChange(e.target.value)}>{children}</select>;
}

export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => <option disabled>{placeholder}</option>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ children, value }) => <option value={value}>{children}</option>;
