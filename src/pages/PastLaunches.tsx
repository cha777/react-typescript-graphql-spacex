import { usePastLaunchesListQuery } from "../graphql/graphql";
import { useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  Container,
  CardHeader,
  Avatar,
  CardMedia,
  CardActionArea,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loader: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },

  avatar: {
    height: "50px",
    width: "50px",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const PastLaunches = () => {
  const classes = useStyles();
  const match = useRouteMatch();

  const { data, loading } = usePastLaunchesListQuery({
    variables: {
      limit: 30,
    },
  });

  if (loading) {
    return (
      <Box padding={3} className={classes.loader}>
        <CircularProgress />
      </Box>
    );
  }

  if (data) {
    return (
      <Box paddingY={3}>
        <Container>
          <Grid container spacing={3}>
            {data.launchesPast?.map((launch) => (
              <Grid key={launch?.id} item md={3} xs={12}>
                <Card>
                  <CardActionArea href={`${match.url}/${launch?.id}`}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          src={launch?.links?.mission_patch_small || ""}
                        />
                      }
                      title={launch?.mission_name}
                      subheader={launch?.rocket?.rocket_name}
                    />
                    <CardMedia
                      className={classes.media}
                      image={launch?.links?.flickr_images![0]!}
                      title={`Photo of ${launch?.mission_name}`}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return null;
};

export default PastLaunches;
