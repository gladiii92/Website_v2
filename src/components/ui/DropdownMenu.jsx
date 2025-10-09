export const DropdownMenu = ({ children }) => <div>{children}</div>;
export const DropdownMenuTrigger = ({ children }) => <>{children}</>;
export const DropdownMenuContent = ({ children }) => <div>{children}</div>;
export const DropdownMenuItem = ({ children, onClick }) => <div onClick={onClick}>{children}</div>;
