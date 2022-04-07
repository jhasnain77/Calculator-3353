import * as React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

function Calculator() {

    // Declaring states
    const [mode, setMode] = React.useState('INFIX')
    const [display, setDisplay] = React.useState(0);
    const [currVal, setCurrVal] = React.useState(0);
    const [vals, setVals] = React.useState([]);
    const [operations, setOperations] = React.useState([]);
    const [state, setState] = React.useState('FIRST_OPERAND');
    const [subState, setSubState] = React.useState('ZERO');
    const [real, setReal] = React.useState(false);

    // Use effect to constantly update the display
    React.useEffect(() => {
        setDisplay(currVal);
    })

    // Function to change the calculator mode
    const changeMode = () => {
        if (mode === 'INFIX') {
            setMode('RPN');
        } else {
            setMode('INFIX');
        }
    }
    
    // Enter function for RPN mode to record the current value into the array
    const enterFn = () => {
        let temp = [...vals];
        temp.push(currVal);
        setVals(temp);
        setState('NEXT_OPERAND');
        setSubState('ZERO');
        setCurrVal(0);
        setReal(false);
    }

    // Function to clear all the states
    const clear = () => {
        setCurrVal(0);
        setVals([]);
        setOperations([]);
        setReal(false);
        setState('FIRST_OPERAND');
        setSubState('ZERO');
    }

    // Function to add a digit on the current number
    // Also checks if the number is real or not yet when a decimal is pushed
    // If it is, then it'll break the function there, making it a null input
    // Otherwise, it'll set the number to be a real number
    const addDigit = (event) => {
        if (event.currentTarget.value === '.') {
            if (real) {
                return;
            } else {
                setReal(true);
            }
        }
        if (currVal === 0) {
            setCurrVal(event.currentTarget.value);
            setSubState('NUM')
        } else {
            let temp = currVal;
            temp += event.currentTarget.value;
            setCurrVal(temp);
        }
    }

    // Function to add an operation to the array of operations
    // Additionally, stores the current value into an array, then clears the current value
    const addOperation = (event) => {
        let temp = [...operations];
        temp.push(event.currentTarget.value);
        let temp2 = [...vals];
        temp2.push(currVal);
        setOperations(temp);
        setVals(temp2);
        setState('NEXT_OPERAND');
        setSubState('ZERO');
        setCurrVal(0);
        setReal(false);
        console.log(temp);
        console.log(temp2);
    }

    // Function to determine the result
    // Due to the way the numbers and operands are stored
    // Nothing changes in this function when the modes are different
    const determineResult = () => {
        let temp = [...vals];
        temp.push(currVal);
        let result;
        // if (mode === 'RPN') {
        //     for (let i = 0; i < operations.length; i++) {
        //         if (i === 0) {
        //             result = eval(temp[i+1] + operations[i] + temp[i]);
        //         } else {
        //             result = eval(temp[i+1] + operations[i] + result);
        //         }
        //         console.log(result);
        //     }
        // } else {
            for (let i = 0; i < operations.length; i++) {
                if (i === 0) {
                    result = eval(temp[i] + operations[i] + temp[i+1]);
                } else {
                    result = eval(result + operations[i] + temp[i+1]);
                }
                console.log(result);
            }
        // }
        setCurrVal(result);

    }

    // Code for UI
    return (
        <Box>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={1}>
                    <Box sx={{ height: 50, width: 250, border: 2, textAlign: 'right' }}>
                        <Typography variant='b1'>
                            {display}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Button value={1} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            1
                        </Typography>
                    </Button>
                    <Button value={2} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            2
                        </Typography>
                    </Button>
                    <Button value={3} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            3
                        </Typography>
                    </Button>
                    <Button value='+' variant='contained' sx={{ height: 50, width: 50 }} onClick={addOperation}>
                        <Typography>
                            +
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button value={4} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            4
                        </Typography>
                    </Button>
                    <Button value={5} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            5
                        </Typography>
                    </Button>
                    <Button value={6} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            6
                        </Typography>
                    </Button>
                    <Button value='-' variant='contained' sx={{ height: 50, width: 50 }} onClick={addOperation}>
                        <Typography>
                            -
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button value={7} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            7
                        </Typography>
                    </Button>
                    <Button value={8} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            8
                        </Typography>
                    </Button>
                    <Button value={9} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            9
                        </Typography>
                    </Button>
                    <Button value='*' variant='contained' sx={{ height: 50, width: 50 }} onClick={addOperation}>
                        <Typography>
                            *
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button value='.' variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            .
                        </Typography>
                    </Button>
                    <Button value={0} variant='contained' sx={{ height: 50, width: 50 }} onClick={addDigit}>
                        <Typography>
                            0
                        </Typography>
                    </Button>
                    <Button value='=' variant='contained' sx={{ height: 50, width: 50 }} onClick={determineResult}>
                        <Typography>
                            =
                        </Typography>
                    </Button>
                    <Button value='/' variant='contained' sx={{ height: 50, width: 50 }} onClick={addOperation}>
                        <Typography>
                            /
                        </Typography>
                    </Button>
                </Grid>
                <Grid item sx={2}>
                    <Button onClick={changeMode} sx={{ width: 150, height: 50, border: 2 }}>
                        <Typography>
                            MODE: {mode}
                        </Typography>
                    </Button>
                    <Button sx={{ width: 100, height: 50, border: 2 }} onClick={clear}>
                        <Typography>
                            CE
                        </Typography>
                    </Button>
                    {mode === 'RPN'?
                    <Button sx={{ width: 100, height: 50, border: 2 }} onClick={enterFn}>
                        <Typography>
                            ENTER
                        </Typography>
                    </Button> : null}
                </Grid>
                <Grid item sx={1}>
                    <Typography>
                        Current State: {state} : {subState}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Calculator;