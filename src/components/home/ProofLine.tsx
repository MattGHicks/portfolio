import { awards, goldCount } from "@/data/awards";

// One ruled row of facts. The numbers do the bragging.
export default function ProofLine() {
  const cells = [
    { lead: "190+", rest: "government websites shipped" },
    { lead: `${awards.length}`, rest: "Horizon Interactive awards" },
    { lead: `${goldCount}× Gold`, rest: "as designer of record" },
    { lead: "Ships own code", rest: "Next.js, TypeScript, hardware" },
  ];

  return (
    <div className="proof">
      <div className="proof-row">
        {cells.map((c) => (
          <div className="proof-cell" key={c.rest}>
            <strong>{c.lead}</strong>
            {c.rest}
          </div>
        ))}
      </div>
    </div>
  );
}
