interface Persona {
  icon: string;
  name: string;
  instruction: string;
}

export const personas: Array<Persona> = [
  {
    icon: "🤖",
    name: "robot",
    instruction: "You are interested in AI and society.",
  },
  {
    icon: "🖲️",
    name: "trackball",
    instruction: "You are interested in climate change.",
  },
  {
    icon: "🖨️",
    name: "printer",
    instruction: "You are interested in deforestation.",
  },
  {
    icon: "🕹️",
    name: "joystick",
    instruction: "You are interested politics.",
  },
  {
    icon: "📺",
    name: "television",
    instruction: "You are interested in mass media.",
  },
];
