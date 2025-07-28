import { currentMonitor } from "@tauri-apps/api/window";

export const getCurrentScreen = async () => {
  const monitor = await currentMonitor();

  if (!monitor) {
    return { width: 0, height: 0 };
  }

  const { width, height } = monitor.size;
  return { width, height };
};
