const GradientBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #000 40%, #0077ff 100%)",
      }}
    />
  );
};

export default GradientBackground;
