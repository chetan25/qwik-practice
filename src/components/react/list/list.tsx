/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { List, ListItem, Link, ListItemText, styled } from "@mui/material";

const CustomizedText = styled(ListItemText)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

const TList = ({
  items,
}: {
  items: {
    id: string;
    slug: string;
    description: string;
    createdAt: Date;
  }[];
}) => {
  return (
    <List
      sx={{
        width: "80vw",
        maxWidth: " 80%",
        bgcolor: "#9b87e3",
        color: "black",
      }}
    >
      {items.map((item) => {
        return (
          <ListItem key={item.id}>
            <CustomizedText
              primary={
                <Link
                  href={`/topics/${item.slug}`}
                  underline="none"
                  color="inherit"
                >
                  {item.slug}
                </Link>
              }
              secondary={item.createdAt.toDateString()}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

// Qwik component wrapping the React component
export const QList = qwikify$(TList, { eagerness: "hover" });
