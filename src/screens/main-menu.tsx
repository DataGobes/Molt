import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { Header } from "../components/header.js";
import { KeyHints } from "../components/footer.js";
import type { Screen } from "../types.js";
import { BRAND_COLOR, MUTED_COLOR } from "../utils/constants.js";

interface MainMenuProps {
  navigate: (screen: Screen) => void;
  hasArchive: boolean;
}

interface MenuItem {
  label: string;
  value: Screen;
  description: string;
}

export function MainMenu({ navigate, hasArchive }: MainMenuProps) {
  const [selected, setSelected] = useState(0);

  const options: MenuItem[] = [
    { label: "Post Tweet", value: "post-tweet", description: "Compose and publish a tweet" },
    { label: "Delete Tweet", value: "delete-tweet", description: "Delete a tweet by ID" },
    { label: "My Profile", value: "profile", description: "View your account info" },
    { label: "Import Archive", value: "import-archive", description: "Import your X data archive" },
    ...(hasArchive
      ? [
          { label: "Browse Tweets", value: "archive-browser" as Screen, description: "Search & browse imported tweets" },
          { label: "Batch Delete", value: "batch-delete" as Screen, description: "Mass delete filtered tweets" },
        ]
      : []),
  ];

  useInput((input, key) => {
    if (key.upArrow || input === "k") {
      setSelected((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    }
    if (key.downArrow || input === "j") {
      setSelected((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    }
    if (key.return) {
      navigate(options[selected].value);
    }
  });

  // Pad labels to align descriptions
  const maxLabelLen = Math.max(...options.map((o) => o.label.length));

  return (
    <Box flexDirection="column">
      <Header />
      <Box marginBottom={1}>
        <Text color={MUTED_COLOR}>Manage your X.com account from the terminal.</Text>
      </Box>
      <Box flexDirection="column">
        {options.map((o, i) => {
          const isSelected = i === selected;
          const padding = " ".repeat(maxLabelLen - o.label.length);
          return (
            <Box key={o.value}>
              <Text color={isSelected ? BRAND_COLOR : undefined}>
                {isSelected ? "  ❯ " : "    "}
              </Text>
              <Text bold={isSelected} color={isSelected ? BRAND_COLOR : undefined}>
                {o.label}
              </Text>
              <Text color={MUTED_COLOR}>
                {padding}   {o.description}
              </Text>
            </Box>
          );
        })}
      </Box>
      <KeyHints hints={["↑↓: navigate", "enter: select"]} />
    </Box>
  );
}
