import { Button, Card, CardActions, CircularProgress, Typography } from "@mui/material";
import AspectRatio from '@mui/joy/AspectRatio';

function DogCard({name, url, undoFunc, likeFunc, dislikeFunc}) {

  let image;
  if(url){
    image = (
      <AspectRatio>
        <div>
          <img src={url}></img>
        </div>
      </AspectRatio>
    );
  }else{
    image = (
      <CircularProgress />
    );
  }

  let button = undefined; 
  if(undoFunc){
    button = (
      <CardActions>
        <Button onClick={undoFunc}>Deshacer</Button>
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