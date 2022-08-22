import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) =>
	createStyles({
		walletContainer: {
			'&.MuiBox-root': {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '39%',
                padding: '2.3% 0 0 0',
				// backgroundColor: '#fff',
                background:"linear-gradient(315deg, #fc9797 30%, #b22222 90%)",
				boxShadow: 'none',
                borderRadius: '22px',
                [theme.breakpoints.down(600)]: {
                    width: "90%",
                },
			},
           
		},
        walletTitle: {
            '&.MuiTypography-root': {
                textAlign: 'center',
                fontWeight: '700',
                color:"#fff"
            },
        },
        divider: {
            '&.MuiBox-root': {
                marginTop: '5%',
                borderBottom: '1px solid #E0E0E0',
            },
        },
        itemContainer: {
            '&.MuiBox-root': {
                padding: '2% 17%',
                backgroundColor:"#fff"
            },
        },
        radioContainer: {
            '&.MuiBox-root': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: '6.5%',
                paddingLeft: '4%',
                height: '65px',
                marginTop: '16px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
            }
        },
        radioTitle: {
            '&.MuiBox-root': {
                display: 'flex',
                flex: '1',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }
        },
        title: {
            '&.MuiTypography-root': {
                marginLeft: '2%',
            },
        },
        icon: {
            '&.MuiCardMedia-root': {
                width: '25px',
                height: '25px',
            },
        },
        btnContainer: {
            '&.MuiBox-root': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor:"#fff",
                padding: '2% 25%',
                borderRadius:"0 0 1em 1em"
                
                // marginTop: '8%',
            },
        },
        btnNext: {
            '&.MuiButton-root': {
                height: '51px',
                width: '100%',
                color: 'white',
                textDecorationLine: 'underline',
                borderRadius: '30px',
                // backgroundColor: '#b22222',
                background:"linear-gradient(315deg, #fc9797 30%, #b22222 90%)",
                '&:hover': {
                    // backgroundColor: '#b22222',
                    background:"#b22222",
                    transform: 'scale(1.1)',
                    },
              
            },
          
        },
	})
);
export default useStyles;
