import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField
} from '@mui/material'
import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setTargetVal } from '../../redux/slices/overViewSlice';



export const AccountProfile = () => {


  const tragetVal = useSelector(state => state.overView.setTarget)

  const [flag, setFlag] = useState(1)
  const [target, setTarget] = useState(tragetVal ? tragetVal : 0)

  const dispatch = useDispatch();

  const targetSubmit = () => {
    dispatch(setTargetVal(target))
    setFlag(1)
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: "1rem"
          }}
        >

          <Typography gutterBottom
            variant="h6" >
            TARGET LOAN AMOUNT
          </Typography>

          <div style={{ display: flag === 1 ? "flex" : "none" }}>
            <Typography color="text.secondary"
              variant="h5" style={{ flex: 3, marginBottom: "1rem", marginTop: "1rem" }}>
              ₹ {tragetVal}
            </Typography>
            <Typography color="text.secondary" style={{ flex: 3, marginBottom: "1rem", marginTop: "1.5rem", cursor: "pointer" }}
            >
              <a style={{ color: "blue", fontSize: "small" }} onClick={() => setFlag(2)}>UPDATE TARGET</a>
            </Typography>
          </div>
          <div style={{ display: flag === 1 ? "none" : "block" }}>
            <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
              <TextField
                fullWidth
                label="UPDATE TARGET"
                name="Target"
                onChange={(event) => setTarget(event.target.value)}
                value={target}
                required
              />
            </div>
            <div>
              <Button style={{ marginBottom: "1rem", width: "100%" }} disabled={target ? false : true} variant="contained" onClick={targetSubmit}>Submit</Button>
            </div>
          </div>
        </Box>
      </CardContent>

    </Card>
  )
}
