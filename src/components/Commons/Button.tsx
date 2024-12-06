type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large' | 'arrow';
    disabled?: boolean;
    block?: boolean;
    loading?: boolean;
    withArrow?: boolean;
  };
  
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  block = false,
  loading = false,
  withArrow = false,
}) => {
  const baseStyles = 'font-inter font-semibold rounded transition-all duration-300';
  const variantStyles = {
    primary: 'bg-primaryBlue hover:bg-primaryBlue-dark text-white',
    secondary: 'bg-offsetBlack hover:bg-offsetBlack-light text-white',
    tertiary: 'bg-secondaryBlue hover:bg-secondaryBlue-dark text-white'
  };
  const sizeStyles = {
    small: 'text-sm py-2 px-4',
    medium: 'text-md py-3 px-6',
    large: 'text-lg py-4 px-8',
    arrow: 'text-md py-3 px-10',
  };
  const blockStyle = block ? 'w-full' : '';
  const loadingState = loading ? 'cursor-wait' : '';
  

  const arrowIcon = (
    <svg className="ml-2 w-5 h-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
      width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.7071 8.20711C16.0976 7.81658 16.0976 7.18342 15.7071 6.79289L9.34315 0.428932C8.95262 0.0384079 8.31946 0.0384079 7.92893 0.428932C7.53841 0.819456 7.53841 1.45262 7.92893 1.84315L13.5858 7.5L7.92893 13.1569C7.53841 13.5474 7.53841 14.1805 7.92893 14.5711C8.31946 14.9616 8.95262 14.9616 9.34315 14.5711L15.7071 8.20711ZM0 8.5L15 8.5V6.5L0 6.5L0 8.5Z" fill="white"/>
    </svg>
      
  );
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${blockStyle} ${loadingState} shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group`;
  
  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
        {withArrow && arrowIcon} {/* Show arrow only when withArrow is true */}
      </a>
    );
  }
  
  return (
    <button
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
      {withArrow && arrowIcon} {/* Show arrow only when withArrow is true */}
    </button>
  );
};
  
export default Button;