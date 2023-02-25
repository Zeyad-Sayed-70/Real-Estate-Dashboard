import { Button, Typography } from "@pankod/refine-mui"
import { CustomButtonProps } from 'interfaces/common';

const CustomButton = ({ 
  type,
  title,
  backgroundColor,
  color,
  fullWidth,
  icon,
  disabled,
  customeStyle,
  handleClick }: CustomButtonProps) => {
  return (
    <Button
      variant={type || 'contained'}
      fullWidth={fullWidth}
      sx={{ 
        backgroundColor: `${backgroundColor}c7`, 
        color,
        '&:hover': {
          backgroundColor: `${backgroundColor}`,
          boxShadow: 'none'
        },
        padding: '.85rem 1rem',
        'svg': {
          fontSize: '16px',
          fontWeight: '500'
        },
        borderRadius: '6px',
        boxShadow: 'none'
       }}
      disabled={disabled}
      onClick={handleClick}
      style={customeStyle}
    >
      {icon}
      <Typography fontWeight={500} sx={{ textTransform: 'capitalize', ml: icon ? 1 : 0 }}>{title}</Typography>
    </Button>
  )
}

export default CustomButton