import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Avatar } from "@mui/material";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(response.data);
      } catch (error) {
        console.error("Error fetching character: ", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Button onClick={() => navigate(-1)} sx={{ marginBottom: 2 }}>
        Back
      </Button>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          src={character.image}
          alt={character.name}
          sx={{ width: 200, height: 200, margin: "auto" }}
        />
        <Typography variant="h4" gutterBottom>
          {character.name}
        </Typography>
        <Typography variant="body1">Status: {character.status}</Typography>
        <Typography variant="body1">Species: {character.species}</Typography>
        <Typography variant="body1">Gender: {character.gender}</Typography>
        <Typography variant="body1">Origin: {character.origin.name}</Typography>
        <Typography variant="body1">Location: {character.location.name}</Typography>
      </Box>
    </Box>
  );
};

export default CharacterDetail;
