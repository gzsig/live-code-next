import { FormattedApiResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export interface GetCsvResponse {
  csv: string;
}

export async function GET(req: NextRequest) {
  try {
    // List of declared medications
    const medications = [
      "Aspirin",
      "Ibuprofen",
      "Paracetamol",
      "Amoxicillin",
      "Metformin",
      "Atorvastatin",
      "Simvastatin",
      "Omeprazole",
      "Lisinopril",
      "Losartan",
    ];

    // Object to store EANs for each medication name
    const medicationEANs: { [key: string]: number } = {};

    // Function to generate a random number with the specified number of digits
    const generateRandomNumber = (digits: number): number => {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Function to pick a random medication name from the list
    const getRandomMedication = (): string => {
      const randomIndex = Math.floor(Math.random() * medications.length);
      return medications[randomIndex];
    };

    // Function to generate or retrieve an EAN for a medication
    const getOrCreateEANForMedication = (medication: string): number => {
      if (!medicationEANs[medication]) {
        medicationEANs[medication] = generateRandomNumber(10);
      }
      return medicationEANs[medication];
    };

    // Function to generate a line of the CSV
    const generateCSVLine = (): string => {
      const name = getRandomMedication();
      const ean = getOrCreateEANForMedication(name);
      const stock = Math.floor(Math.random() * 1000) + 1;
      const price = (Math.random() * 100).toFixed(2);
      return `${name};${ean};${stock};${price}`;
    };

    // Main function to generate CSV lines
    const generateCSV = (linesCount: number): string => {
      const header = "name;ean;stock;price";
      const lines = [header];
      for (let i = 0; i < linesCount; i++) {
        lines.push(generateCSVLine());
      }
      return lines.join("\n");
    };

    // Determine the number of lines (default to 100 if not specified in query params)
    const url = new URL(req.url);
    const linesCount = url.searchParams.get("lines")
      ? parseInt(url.searchParams.get("lines")!, 10)
      : 100;

    // Generate the CSV content
    const csvContent = generateCSV(linesCount);

    const responseBody: FormattedApiResponse<GetCsvResponse> = {
      data: { csv: csvContent },
    };

    return new NextResponse(JSON.stringify(responseBody, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const responseBody: FormattedApiResponse<GetCsvResponse> = {
      error: "An error occurred while generating the CSV.",
    };
    return new NextResponse(JSON.stringify(responseBody), {
      status: 500,
    });
  }
}
