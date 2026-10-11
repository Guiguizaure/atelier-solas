"use client";

import { LabelButton } from "@/components/chrome/LabelButton";
import { useIntro } from "@/components/intro/IntroProvider";
import { Replay } from "@/components/svg/icons";

/** « Button it back up »: the shirt closes over the page and the intro plays again. */
export function ReplayButton() {
  const { replay } = useIntro();
  return (
    <LabelButton variant="rust" icon={<Replay />} onClick={replay}>
      Button it back up
    </LabelButton>
  );
}
