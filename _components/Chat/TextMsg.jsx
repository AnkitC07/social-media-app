import React from "react";
import {
  Stack,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";

const TextMsg = ({ el }) => {
    console.log('------------')

    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? "white"
                        : "blueviolet",
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.message}
                </Typography>
            </Box>
            {/* {menu && <MessageOption />} */}
        </Stack>
    );
};

export default TextMsg;
