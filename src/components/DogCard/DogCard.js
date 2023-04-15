import { Card, CardActions, CircularProgress, Typography, IconButton } from "@mui/material";
import { Reply } from "@mui/icons-material";
import AspectRatio from '@mui/joy/AspectRatio';

function DogCard({ name, url, undoFunc, likeFunc, dislikeFunc }) {

    let image;
    if (url) {
        image = (
            <AspectRatio>
                <div>
                    <img src={url}></img>
                </div>
            </AspectRatio>
        );
    } else {
        image = (
            <AspectRatio className="no-loaded-image">
                <div>
                    <CircularProgress />
                </div>
            </AspectRatio>
        );
    }

    let button = undefined;
    if (undoFunc) {
        button = (
            <CardActions>
                <IconButton className="reply-icon">
                    <Reply onClick={undoFunc} />
                </IconButton>
            </CardActions>
        );
    }
    return (
        <Card variant="outlined" sx={{ width: 300 }}>
            <Typography mt={2}>{name}</Typography>
            {button}
            {image}
        </Card>
    );
}

export default DogCard;