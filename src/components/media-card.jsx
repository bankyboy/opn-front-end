import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function MediaCard({ ...props }) {
  const { name, imgPath } = props;

  return (
    <Card
      sx={{
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '300px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <CardMedia sx={{ flex: 3 }} image={imgPath} title={name} />
      <Box
        className="flex flex-grow justify-between items-center w-full mx-6 h-full"
        sx={{
          flex: 1,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              color: '#616A80',
              fontWeight: 'semiBold',
            }}
            component="div"
          >
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: '#155BE7',
              borderColor: '#155BE7',
              zIndex: 0,
            }}
          >
            Donate
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
