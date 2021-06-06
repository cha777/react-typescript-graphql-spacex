import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useLaunchDetailsQuery } from "../graphql/graphql";

const useStyles = makeStyles(() => ({
  loader: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },

  root: {
    width: "400px",
    margin: "auto",
  },

  avatar: {
    height: "50px",
    width: "50px",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  img_grid: {
    padding: "10px",
    maxWidth: "100vw",
  },

  img: {
    height: "300px",
    width: "300px",
  },
}));

const LaunchDetails = () => {
  const classes = useStyles();
  const { id }: { id: string } = useParams();

  const { data, loading } = useLaunchDetailsQuery({
    variables: {
      id: id,
    },
  });

  if (loading) {
    return (
      <Box padding={3} className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box paddingY={3}>
      <Container>
        <Card className={classes.root}>
          <CardHeader title={data?.launch?.mission_name} />
          <CardMedia
            className={classes.media}
            image={data?.launch?.links?.flickr_images?.[0] || ""}
          />
          <CardContent>{data?.launch?.details}</CardContent>
        </Card>
        {data?.launch?.links?.flickr_images?.length ? (
          <Grid container spacing={10} className={classes.img_grid}>
            {data.launch.links.flickr_images?.map((image, index) => (
              <Grid key={index} item md={4} className={classes.img}>
                <Card>
                  <CardMedia className={classes.media} image={image!} />
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Container>
    </Box>
  );
};

export default LaunchDetails;
