import React from "react";
import { Stack, Box, Typography, Menu, MenuItem, IconButton, Divider } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image as ImageIcon } from "phosphor-react";
// import { Message_options } from "../../data";
// import { Link } from "react-router-dom";
// import truncateString from "../../utils/truncate";
// import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Embed from "react-embed";
import Image from "next/image"; 
import { formatTime } from "../../app/functions/getTIme";

// const theme = {
//     palette: {
//         text: "grey"
//     }
// }

const MessageOption = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical
                size={20}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} px={1}>
                    {/* {Message_options.map((el) => (
            <MenuItem onClick={handleClose}>{el.title}</MenuItem>
          ))} */}
                </Stack>
            </Menu>
        </>
    );
};

const TextMsg = ({ el, menu }) => {
    console.log("is sent =>",el)
    const theme = useTheme();
    return (
        <Stack position={"relative"} direction="row" justifyContent={el.incoming ? "start" : "end"}>

            <Box
                px={1.5}
                py={1.5}
                sx={{
                    position:'relative',
                    backgroundColor: el.incoming ? "#1b2730" : "#fffff8",
                    borderRadius: 1.5,
                    minWidth:'50px',
                    maxWidth: '55%',
                    width: "max-content",
                }}
            >
                <Typography variant="body2" color={el.incoming ? "#fff" : "#000"} className="break-words text-pretty">
                    {el.message}
                </Typography>
            <span className={`absolute text-[11px] right-1 bottom-0 ${el.incoming ?"text-gray-300":"text-gray-600"} `}>{formatTime(el?.date)}</span>
            </Box>
            {/* {menu && <MessageOption />} */}
        </Stack>
    );
};
const MediaMsg = ({ el, menu }) => {
    const theme = useTheme();
    return (
        <Stack position={"relative"} direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    position:'relative',
                    backgroundColor: el.incoming ? "#1b2730" : "#fffff8",
                    borderRadius: 1.5,
                    width: "max-content",
                    minWidth:'50px',
                    maxWidth: '55%',
                    width: "max-content",
                }}
            >
                <Stack spacing={1}>
                    {el.img.map((img, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 1.5,
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                src={img}
                                sizes="100vw"
                                style={{
                                    width: "150px",
                                    height: "auto",
                                }}
                                width={500}
                                height={300}
                            />
                             {/* <img src={img} alt={el.message} style={{ width: "150px", height: "100%" }} /> */}
                        </Box>
                    ))}
                    {/* <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          /> */}
                    <Typography variant="body2" color={el.incoming ? "#fff" : "#000"}>
                        {el.message}
                    </Typography>
                </Stack>
            <span className={`absolute text-xs right-1 bottom-0`}>{formatTime(el?.date)}</span>
            </Box>
            {/* {menu && <MessageOption />} */}
        </Stack>
    );
};
const DocMsg = ({ el, menu }) => {
    const theme = useTheme();
    return (
        <Stack position={"relative"} direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            //   backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <ImageIcon size={48} />
                        <Typography variant="caption">Abstract.png</Typography>
                        <IconButton>
                            <DownloadSimple />
                        </IconButton>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            <span className={`absolute text-xs right-1 bottom-0`}>{formatTime(el?.date)}</span>
            {/* {menu && <MessageOption />} */}
        </Stack>
    );
};
const LinkMsg = ({ el, menu }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? alpha(theme.palette.background.default, 1)
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="start"
                        sx={{
                            //   backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}
                    >
                        <Stack direction={"column"} spacing={2}>
                            <Embed width="300px" isDark url={el.message} />
                        </Stack>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        <div dangerouslySetInnerHTML={{ __html: el.message }}></div>
                    </Typography>
                </Stack>
            </Box>
            {/* {menu && <MessageOption />} */}
        </Stack>
    );
};
const ReplyMsg = ({ el, menu }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
            <Box
                px={1.5}
                py={1.5}
                sx={{
                    //   backgroundColor: el.incoming
                    //     ? alpha(theme.palette.background.paper, 1)
                    //     : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content",
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="column"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            //   backgroundColor: alpha(theme.palette.background.paper, 1),

                            borderRadius: 1,
                        }}
                    >
                        <Typography variant="body2" color={theme.palette.text}>
                            {el.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
            {/* {menu && <MessageOption />} */}
        </Stack>
    );
};
const Timeline = ({ el }) => {
    const theme = useTheme();
    return (
        <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Divider width="46%" sx={{ backgroundColor: "white" }} />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>
                {/* {el.text} */}
                Today
            </Typography>
            <Divider width="46%" sx={{ backgroundColor: "white" }} />
        </Stack>
    );
};
export default TextMsg;

export { Timeline, MediaMsg, LinkMsg, DocMsg, ReplyMsg };
