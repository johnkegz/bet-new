import { Grid, Button } from '@material-ui/core';

const FrozenPage = () => {
    return (
        <div
            style={{
                height: '100vh',
                // background: 'red',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <div
                        style={{
                            background: 'darkBlue',
                            maxWidth: '400px',
                            overflow: 'hidden',
                            position: 'relative',
                            margin: '0 auto',
                            // height: '50px'
                        }}
                    >
                        Frozen 
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default FrozenPage;
