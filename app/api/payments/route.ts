import {
  ResponseErrorPaymentsMethods,
  StatusDetails,
  ErrorCodes,
  ErrorDescriptions,
} from "@/types";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const PRIVATE_API_KEY =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PRIVATE_API_KEY_PAYWAY
      : process.env.NEXT_PRIVATE_API_KEY_PAYWAY_DEV;
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_URL
      : process.env.NEXT_PUBLIC_URL_DEV;

  try {
    const body = await req.json();
    const URL = `${API_URL}payments`;
    console.log(body, "____________BODY");
    console.log(URL, "______ URL");
    const response = await axios.post(URL, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apikey: PRIVATE_API_KEY,
      },
    });

    return NextResponse.json({ response: response.data }, { status: 200 });
  } catch (error) {

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
       const errorStatus =`${error.response?.data?.validation_errors[0].param}` 
      return NextResponse.json(
            { response: errorStatus },
            { status: 400 }
          );
      }

      console.log(error, "axios error paymentsaaa");
      const errorResponseDetail: ResponseErrorPaymentsMethods = {
        id: error.response?.data.id,
        status: error.response?.data.status,
        status_details: {
          ticket: error.response?.data?.status_details?.ticket || "",
          card_authorization_code:
            error.response?.data?.status_details?.card_authorization_code || "",
          address_validation_code:
            error.response?.data?.status_details?.address_validation_code || "",
          error: {
            type: error.response?.data?.status_details?.error?.type || "",
            reason: {
              id: error.response?.data?.status_details?.error?.reason?.id || -1,
              description:
                ErrorDescriptions[
                  error.response?.data?.status_details?.error?.reason
                    ?.id as ErrorCodes
                ]?.short || "",
              additional_description:
                ErrorDescriptions[
                  error.response?.data?.status_details?.error?.reason
                    ?.id as ErrorCodes
                ]?.detailed || "",
            },
          },
        },
      };
      return NextResponse.json(
        { response: errorResponseDetail },
        { status: error.response?.status }
      );
    }
    console.log("error fuera del if");
    return NextResponse.json({ response: error }, { status: 500 });
  }
}
