import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const navigate = useNavigate();

  // Fetch data from the API
  const fetchCharacters = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      setCharacters((prev) => [...prev, ...response.data.results]);
      setPage((prev) => prev + 1);
      setHasMore(response.data.info.next !== null);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // Detect scroll to bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        fetchCharacters();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchCharacters]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Rick and Morty Characters
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <Button
          variant={viewMode === "grid" ? "contained" : "outlined"}
          startIcon={<ViewModuleIcon />}
          onClick={() => setViewMode("grid")}
        >
          Grid View
        </Button>
        <Button
          variant={viewMode === "list" ? "contained" : "outlined"}
          startIcon={<ViewListIcon />}
          onClick={() => setViewMode("list")}
        >
          List View
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {characters.map((character) => (
          <Grid
            item
            xs={12}
            sm={viewMode === "grid" ? 6 : 12}
            md={viewMode === "grid" ? 4 : 6}
            lg={viewMode === "grid" ? 3 : 4}
            key={character.id}
            onClick={() => navigate(`/character/${character.id}`)} // Navigate to detail page
            style={{ cursor: "pointer" }}
          >
            {viewMode === "grid" ? (
              <Card>
                <CardMedia
                  component="img"
                  alt={character.name}
                  height="200"
                  image={character.image}
                />
                <CardContent>
                  <Typography variant="h6">{character.name}</Typography>
                </CardContent>
              </Card>
            ) : (
              <Paper sx={{ display: "flex", padding: 2 }}>
                <Avatar src={character.image} alt={character.name} />
                <Box ml={2}>
                  <Typography variant="h6">{character.name}</Typography>
                  <Typography variant="body2">Status: {character.status}</Typography>
                </Box>
              </Paper>
            )}
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default CharacterGrid;
