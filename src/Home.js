import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        // background: "linear-gradient(to bottom, #99f2c8, #1f4037)",
        padding: "0 20px"
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 700,
          backgroundImage: "linear-gradient(to right, #267871, #136a8a);",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
          borderRadius: "16px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              // fontWeight: "bold",
              letterSpacing: "1.5px",
              marginBottom: "20px"
            }}
          >
            Service Level Agreement
          </Typography>
          <Typography variant="body1"  sx={{
              textAlign: "center"
            }}>
            A service-level agreement (SLA) sets the expectations between the
            service provider and the customer and describes the products or
            services to be delivered, the single point of contact for end-user
            problems, and the metrics by which the effectiveness of the process
            is monitored and approved.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
