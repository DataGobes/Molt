import React from "react";
import { Box, Text, useStdout } from "ink";
import { MUTED_COLOR } from "../utils/constants.js";

interface FooterProps {
  hints?: string[];
  showBack?: boolean;
}

export function Footer({ hints = [], showBack = false }: FooterProps) {
  const { stdout } = useStdout();
  const width = stdout?.columns ?? 60;
  const allHints = [
    ...(showBack ? ["esc: back"] : []),
    ...hints,
    "q: quit",
  ];

  return (
    <Box flexDirection="column" marginTop={1}>
      <Text color={MUTED_COLOR}>{"─".repeat(width)}</Text>
      <Text color={MUTED_COLOR}>{allHints.join("  │  ")}</Text>
    </Box>
  );
}

export function KeyHints({ hints = [], showBack = false }: FooterProps) {
  const { stdout } = useStdout();
  const width = stdout?.columns ?? 60;
  const allHints = [
    ...(showBack ? ["esc: back"] : []),
    ...hints,
    "q: quit",
  ];

  return (
    <Box flexDirection="column" marginTop={1}>
      <Text color={MUTED_COLOR}>{"─".repeat(width)}</Text>
      <Text color={MUTED_COLOR}>{allHints.join("  │  ")}</Text>
    </Box>
  );
}
