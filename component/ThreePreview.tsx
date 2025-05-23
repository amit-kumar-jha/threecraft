"use client";

import dynamic from "next/dynamic";

const Cube = dynamic(() => import("./animations/Cube"), { ssr: false });
const Galaxy = dynamic(() => import("./animations/Galaxy"), { ssr: false });
const Waves = dynamic(() => import("./animations/Waves"), { ssr: false });
const Sphere = dynamic(() => import("./animations/Sphere"), { ssr: false });
const MorphingBlobScene = dynamic(
  () => import("./animations/MorphingBlobScene"),
  {
    ssr: false,
  }
);
const DeveloperWorkspaceScene = dynamic(
  () => import("./animations/DeveloperWorkspace"),
  {
    ssr: false,
  }
);
const MysticOrbitals = dynamic(() => import("./animations/MysticOrbitals"), {
  ssr: false,
});
const OrbitPulse = dynamic(() => import("./animations/OrbitPulse"), {
  ssr: false,
});

const CardVerse = dynamic(() => import("./animations/CardVerse"), {
  ssr: false,
});

const Bot = dynamic(() => import("./animations/Bot"), {
  ssr: false,
});
const HoloCore = dynamic(() => import("./animations/HoloCore"), {
  ssr: false,
});
const NeuralNetworkPulse = dynamic(
  () => import("./animations/NeuralNetworkPulse"),
  {
    ssr: false,
  }
);
const TimeVortex = dynamic(() => import("./animations/TimeVortex"), {
  ssr: false,
});
const CosmicTreeGalaxy = dynamic(
  () => import("./animations/CosmicTreeGalaxy"),
  {
    ssr: false,
  }
);
const DreamCatcherNebula = dynamic(
  () => import("./animations/DreamCatcherNebula"),
  {
    ssr: false,
  }
);
const Interactive3DNav = dynamic(
  () => import("./animations/Interactive3DNav"),
  {
    ssr: false,
  }
);
const RevealEffect = dynamic(() => import("./animations/RevealEffect"), {
  ssr: false,
});
const EarthCanvas = dynamic(() => import("./animations/Earth"), {
  ssr: false,
});
const Dragon = dynamic(() => import("./animations/AnimatedDragonFly"), {
  ssr: false,
});

const GalaxyGenerator = dynamic(() => import("./animations/GalaxyGenerator"), {
  ssr: false,
});

type Props = {
  slug?: string | undefined;
};

export const ThreePreview = ({ slug }: Props) => {
  switch (slug) {
    case "cube":
      return <Cube />;
    case "galaxy":
      return <Galaxy />;
    case "waves":
      return <Waves />;
    case "sphere":
      return <Sphere />;
    case "morphingBlobScene":
      return <MorphingBlobScene />;
    case "developerWorkspace":
      return <DeveloperWorkspaceScene />;
    case "mysticOrbitals":
      return <MysticOrbitals />;
    case "orbitPulse":
      return <OrbitPulse />;
    case "cardVerse":
      return <CardVerse />;
    case "bot":
      return <Bot />;
    case "holoCore":
      return <HoloCore />;
    case "neuralNetworkPulse":
      return <NeuralNetworkPulse />;
    case "timeVortex":
      return <TimeVortex />;
    case "cosmicTreeGalaxy":
      return <CosmicTreeGalaxy />;
    case "dreamCatcherNebula":
      return <DreamCatcherNebula />;
    case "interactive3DNav":
      return <Interactive3DNav />;
    case "revealEffect":
      return <RevealEffect />;
    case "earthCanvas":
      return <EarthCanvas />;
    case "dragon":
      return <Dragon />;
    case "galaxyGenerator":
      return <GalaxyGenerator />;

    default:
      return (
        <div className="text-center py-12">
          Select an animation from dashboard
        </div>
      );
  }
};
