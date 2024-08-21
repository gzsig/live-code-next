"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { GetCsvResponse } from "../../api/generate-csv/route";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<GetCsvResponse | null>(null);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/generate-csv?lines=15");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => router.push("/")} variant="link">
        Home
      </Button>
      {data?.csv.split("\n").map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}

      <div className="flex gap-2">
        <Button onClick={fetchData} variant="secondary">
          Load Data
        </Button>
      </div>
    </div>
  );
}
