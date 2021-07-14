import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const NegativeButton = withStyles(() => ({
    root: {
      backgroundColor: 'rgb(207, 49, 49)',
      borderColor: 'rgb(177, 37, 37)',
      '&:hover': {
        backgroundColor: 'rgb(177, 37, 37)',
        borderColor: 'rgb(177, 37, 37)',
        color: 'white'
      },
    },
  }))(Button);

const PositiveButton = withStyles(() => ({
    root: {
      backgroundColor: '#4967ec',
      borderColor: '#3f5ad1',
      '&:hover': {
        backgroundColor: '#3f5ad1',
        borderColor: '#3f5ad1',
        color: 'white'
      },
    },
  }))(Button);

  const CustomButton = (props) => {

    const buttoProps = {
        color: props.color,
        onClick: props.onClick,
        variant: props.variant,
        type: props.type,
        disabled: props.disabled
    }

    if(props.buttonType === "Negative") {
        return <NegativeButton {...buttoProps}>{props.children}</NegativeButton>
    } else {
        return <PositiveButton {...buttoProps}>{props.children}</PositiveButton>
    }
    
  }


  export default CustomButton;