import React from 'react';
import Slider from 'react-slick';
import { Grid, Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 145,
  },
  media: {
    height: 70,
  },
  slider: {
    "& .slick-prev, & .slick-next": {
      zIndex: 1,
    },
  },
}));
const imageUrl= 'data:image/jpeg;base64,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'

const products = [
  { id: 1, name: 'Camera 1', price: '100.00', imageUrl: imageUrl},
  { id: 2, name: 'Camera 2', price: '200.00', imageUrl: imageUrl },
  { id: 3, name: 'Camera 3', price: '300.00', imageUrl: imageUrl },
  { id: 4, name: 'Camera 4', price: '400.00', imageUrl: imageUrl },
  { id: 5, name: 'Camera 5', price: '500.00', imageUrl: imageUrl },
  // Add more products as needed
];

const ProductSlider = () => {
  const classes = useStyles();

  const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true, // Enable autoplay
  autoplaySpeed: 900, // Set autoplay speed in milliseconds
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

  return (
    <div className={classes.root}>
      <Slider {...settings} className={classes.slider}>
        {products.map((product) => (
          <div key={product.id}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={product.imageUrl}
                title={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Price: ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
