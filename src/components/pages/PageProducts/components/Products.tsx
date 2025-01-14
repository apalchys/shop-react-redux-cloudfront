import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import get from 'lodash/get';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Product } from 'models/Product';
import { formatAsPrice } from 'utils/utils';
import AddProductToCart from 'components/AddProductToCart/AddProductToCart';
import axios from 'axios';
import API_PATHS from 'constants/apiPaths';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async function getProducts() {
      try {
        const response = await axios.get(`${API_PATHS.product}/products`, {});
        const products = get(response, 'data.products', []);
        setProducts(products);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`data:image/jpeg;base64,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`}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{formatAsPrice(product.price)}</Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
