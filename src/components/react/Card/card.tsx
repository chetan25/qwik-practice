/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

// An existing React component
const Greetings = () => {
  return (
    <div>
      <Card sx={{ minWidth: 575 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

// Qwik component wrapping the React component
export const QGreetings = qwikify$(Greetings, { eagerness: "hover" });
