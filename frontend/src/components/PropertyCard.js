import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
//import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import { propertyData } from './PropertyDataSample';
import { Grid, Stack, Chip } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PropertyCard() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={2}>
      {propertyData.map((data, key) => (
        <Grid item xs={12} md={4} key={key}>
        <Card sx={{ maxWidth: 345, margin:'0 auto' }} >
        <CardMedia
            component="img"
            height="194"
            image={data.imgSrc}
            alt="Property Image"
          />
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: red[500] }} aria-label="Property">
            //     R
            //   </Avatar>
            // }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={data.price}
            subheader={data.address}
          />
          
          <CardContent>

            <Stack direction="row" spacing={1} sx={{overflowX: 'auto', whiteSpace:'nowrap'}}>
              <Chip label={data.listingStatus} color='warning' />
              <Chip color="success" label="Other1" />
              <Chip color="primary" label="Other2" />
              <Chip color="secondary" label="Other3" />
            </Stack>
            
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>1. Find a randomer.</Typography>
              <Typography paragraph>2. Say nothing to the randomer.</Typography>
              <Typography paragraph>3. Stare directly into the randomer's eyes.</Typography>
              <Typography paragraph>4. State a random gruesome crime fact.</Typography>
              <Typography paragraph>5. Promote our website.</Typography>
              <Typography paragraph>6. Run before the randomer calls the police.</Typography>
            </CardContent>
          </Collapse> */}
        </Card>
        </Grid>
      ))}
    </Grid>
  );
}
