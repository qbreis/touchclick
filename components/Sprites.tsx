export default function Sprites({ handleClick, sprites }: any) {
  return (
    <div className="sprites" onClick={handleClick}>
      {sprites.map((sprite:any, key:any) => {
        return (
          <div
            key={key}
            className="location-circle"
            style={{ left: sprite.clientX, top: sprite.clientY }}
          >
            {key}
          </div>
        );
      })}
    </div>
  );
}
