import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { AttachMoney, LocalHotel, Wc } from '@mui/icons-material';
import { Button } from '@mui/material';


export default function Room({room}){
  const navigate = useNavigate();
    const handleBook = (bedType) => {
        navigate(`/book/${bedType}`);
    }
  return (
    <Card  sx={{ maxWidth: 345 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {room.avatar}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={room.title}
    />
    <CardMedia
      component="img"
      height="194"
      image={room.imgUrl}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {room.description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <LocalHotel />: {room.bed}
      </IconButton>
      <IconButton aria-label="share">
        <Wc />: {room.capacity}
      </IconButton>
      <IconButton aria-label="price">
        <AttachMoney />: {room.price}
      </IconButton>
      <Button onClick={() => handleBook(room.bedType)} variant='contained' color='primary'>
        Book</Button>
    </CardActions>
   
  </Card>
  );
}
