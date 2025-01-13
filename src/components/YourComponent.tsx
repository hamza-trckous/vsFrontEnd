import Link from "next/link";
import React from "react";

const YourComponent: React.FC = () => {
  return (
    <div>
      {/* ...existing code... */}
      <Link href="/your-path" legacyBehavior>
        <a>Your Link Text</a>
      </Link>
      {/* ...existing code... */}
    </div>
  );
};

export default YourComponent;
