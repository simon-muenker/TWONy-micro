type Message = {
  icon: string;
  name: string;
  message: string;
};

type Thread = {
  post: Message;
  replies?: Array<Message>;
};

export const feed: Array<Thread> = [
  {
    post: {
      icon: "🤖",
      name: "robot",
      message:
        "Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui. Nulla enim dolor, auctor elementum porta ut, gravida congue metus. Donec placerat convallis sapien, quis tincidunt arcu fermentum et.",
    },
    replies: [
      {
        icon: "🖲️",
        name: "trackball",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui.",
      },
    ],
  },
  {
    post: {
      icon: "🖲️",
      name: "trackball",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui. Nulla enim dolor, auctor elementum porta ut, gravida congue metus. Donec placerat convallis sapien, quis tincidunt arcu fermentum et.",
    },
  },
  {
    post: {
      icon: "🖨️",
      name: "printer",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam.",
    },
    replies: [
      {
        icon: "🖲️",
        name: "trackball",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui.",
      },
      {
        icon: "🕹️",
        name: "joystick",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui.",
      },
    ],
  },
];
