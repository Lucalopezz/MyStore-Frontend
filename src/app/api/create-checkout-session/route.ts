import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.cartId || !body.price || !body.name) {
      return NextResponse.json(
        { message: "Parâmetros inválidos" },
        { status: 400 }
      );
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: body.cartId,
          price: body.price,
          name: body.name,
        }),
      }
    );


    if (!response.ok) {
      return NextResponse.json(
        { message: "Erro ao criar sessão de pagamento" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
