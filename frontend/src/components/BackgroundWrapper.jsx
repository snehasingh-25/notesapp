export default function BackgroundWrapper({ children }) {
  return (
    <div className="background-wrapper">
      {/* Foreground Content */}
      jj
      <div className="foreground">
        {children}
      </div>
    </div>
  );
}