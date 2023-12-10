const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const isMobile = () => (getWindowDimensions().height < 900) && (getWindowDimensions().width < 400);

export default isMobile();