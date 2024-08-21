import { db, Medication, ZMedication } from "@/lib/data/db";
import { FormattedApiResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export interface GetMedicationResponse {
  medication: Medication[];
}

export async function GET(req: NextRequest) {
  try {
    const med = db.findAll();

    const responseBody: FormattedApiResponse<GetMedicationResponse> = {
      data: { medication: med },
    };

    return new NextResponse(JSON.stringify(responseBody, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const responseBody: FormattedApiResponse<GetMedicationResponse> = {
      error: "Failed to fetch data",
    };
    return new NextResponse(JSON.stringify(responseBody), {
      status: 500,
    });
  }
}

export interface PostMedicationRequest {
  medication: Medication;
}

export interface PostMedicationResponse {
  message: string;
  medication: Medication;
}

export async function POST(req: NextRequest) {
  try {
    const body: PostMedicationRequest = await req.json();

    const medication = ZMedication.parse(body.medication);

    db.create(medication);

    const responseBody: FormattedApiResponse<PostMedicationResponse> = {
      data: {
        message: "Medication created successfully",
        medication: medication,
      },
    };

    return new NextResponse(JSON.stringify(responseBody, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const responseBody: FormattedApiResponse<PostMedicationResponse> = {
      error: "Failed to create medication",
    };

    return new NextResponse(JSON.stringify(responseBody), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
